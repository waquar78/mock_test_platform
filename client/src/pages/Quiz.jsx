
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGetQuestionsQuery, useSubmitQuizMutation } from "../features/question/questionApi";
import { formatTime } from "../utils/helper";

const Quiz = () => {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

    const { data, error, isLoading } = useGetQuestionsQuery();
    const [submitQuiz] = useSubmitQuizMutation();

    const quizLevel = data?.level || 1; 

    //  handleSubmit updated
    const handleSubmit = useCallback(async () => {
        const userAnswers = Object.keys(answers).map((questionId) => {
            const q = questions.find((q) => q._id === questionId);
            return {
                questionId,
                submittedAnswer: answers[questionId],
                topic: q?.topic, // include topic for weakAreas
            };
        });

        if (userAnswers.length !== questions.length) {
            toast.error(`Please answer all ${questions.length} questions.`);
            return;
        }

        try {
            await submitQuiz({ userAnswers }).unwrap(); //  no level sent
            navigate("/dashboard"); // dashboard will fetch updated profile itself
        } catch (err) {
            toast.error(err?.data?.message || "Error submitting quiz.");
        }
    }, [answers, submitQuiz, navigate, questions]);

    // Timer effect
    useEffect(() => {
        if (timeLeft <= 0 && questions.length > 0) {
            handleSubmit();
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, questions, handleSubmit]);

    // Set questions when data is loaded
    useEffect(() => {
        if (data?.success && data?.questions) {
            setQuestions(data.questions);
        }
    }, [data]);

    const handleOptionSelect = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    if (isLoading) {
        return <div className="h-screen flex items-center justify-center text-xl">Loading...</div>;
    }
    if (error) {
        return <div className="h-screen flex items-center justify-center text-xl text-red-500">Error: {error.message}</div>;
    }

    const currentQuestion = questions[currentIndex];

    if (!currentQuestion) {
        return <div className="h-screen flex items-center justify-center text-xl text-gray-500">No questions available for this level.</div>;
    }

    const getLevelName = (level) => {
        if (level === 1) return "Easy";
        if (level === 2) return "Medium";
        if (level === 3) return "Hard";
        return "";
    };

    return (
        <div className="h-screen w-screen bg-gray-100 flex flex-col">
            <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <h2 className="text-lg font-bold text-gray-700">⏳ Time Left: {formatTime(timeLeft)}</h2>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {getLevelName(quizLevel)} Level
                    </span>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Question {currentIndex + 1} / {questions.length}
                </span>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-2xl p-6 w-[600px] space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">{currentQuestion.text}</h3>
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleOptionSelect(currentQuestion._id, option.optionText)}
                                className={`p-3 border rounded-lg cursor-pointer transition ${
                                    answers[currentQuestion._id] === option.optionText
                                        ? "bg-blue-600 text-white border-blue-600"
                                        : "bg-gray-50 hover:bg-gray-100"
                                }`}
                            >
                                {option.optionText}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className={`px-4 py-2 rounded-lg ${
                                currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-gray-600 hover:bg-gray-700 text-white"
                            }`}
                        >
                            ⬅ Previous
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={currentIndex === questions.length - 1}
                            className={`px-6 py-2 rounded-lg transition ${
                                currentIndex === questions.length - 1
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            Next ➡
                        </button>
                    </div>

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={Object.keys(answers).length !== questions.length}
                            className={`px-6 py-2 rounded-lg transition ${
                                Object.keys(answers).length !== questions.length
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                            }`}
                        >
                             Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
