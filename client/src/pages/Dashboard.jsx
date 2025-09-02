import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUserProfileQuery, useLogoutUserMutation } from '../fetures/auth/authApi';
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
    const navigate = useNavigate();
    const { data, error, isLoading } = useGetUserProfileQuery();
    const [logoutUser] = useLogoutUserMutation();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center text-xl">Loading your dashboard...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Error loading dashboard: {error.message}</div>;
    }
    
    const user = data?.user;
    if (!user) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">No user data available.</div>;
    }

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap(); 
            toast.success("Logout successful!");
            navigate("/"); 
        } catch (err) {
            console.error("Logout failed:", err);
            toast.error("Logout failed. Try again.");
        }
    };

    const renderQuizButton = (level, buttonText, isDisabled) => (
        <button
            onClick={() => navigate(`/quiz?level=${level}`)}
            disabled={isDisabled}
            className={`px-5 py-2 text-base sm:px-6 sm:py-3 sm:text-lg font-semibold text-white rounded-lg transition-colors ${
                isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
            {buttonText}
        </button>
    );

    const totalQuestionsAttempted =
        user.progress.easy.questionsAttempted +
        user.progress.medium.questionsAttempted +
        user.progress.hard.questionsAttempted;

    const totalCorrectAnswers =
        user.progress.easy.correctAnswers +
        user.progress.medium.correctAnswers +
        user.progress.hard.correctAnswers;

    return (
        <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center justify-center p-3 sm:p-4 overflow-y-auto no-scrollbar">
            <Toaster position="top-right" reverseOrder={false} />

            <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-8 w-full max-w-4xl space-y-6 sm:space-y-8">
                <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-900">Your Quiz Dashboard</h1>

                {/* Overall Progress Section */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-inner">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Overall Progress</h2>
                    <div className="flex justify-around items-center text-center">
                        <div>
                            <p className="text-3xl sm:text-4xl font-extrabold text-blue-600">{totalQuestionsAttempted}</p>
                            <p className="text-sm text-gray-500">Questions Attempted</p>
                        </div>
                        <div>
                            <p className="text-3xl sm:text-4xl font-extrabold text-green-600">{totalCorrectAnswers}</p>
                            <p className="text-sm text-gray-500">Correct Answers</p>
                        </div>
                    </div>
                </div>

                {/* Level Progress & Weak Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {/* Level Scores */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-inner">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Level Scores</h2>
                        <ul className="space-y-3">
                            <li className="flex justify-between items-center py-2 border-b">
                                <span className="font-medium text-gray-700">Easy Level:</span>
                                <span className="text-lg font-bold text-blue-500">{user.progress.easy.score}</span>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b">
                                <span className="font-medium text-gray-700">Medium Level:</span>
                                <span className="text-lg font-bold text-blue-500">{user.progress.medium.score}</span>
                            </li>
                            <li className="flex justify-between items-center py-2">
                                <span className="font-medium text-gray-700">Hard Level:</span>
                                <span className="text-lg font-bold text-blue-500">{user.progress.hard.score}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Weak Areas */}
                    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl shadow-inner">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">Your Weak Areas</h2>
                        <div className="space-y-3 sm:space-y-4">
                            {["easy", "medium", "hard"].map((lvl) => (
                                <div key={lvl}>
                                    <h3 className="text-lg font-semibold capitalize text-gray-700">{lvl} Level</h3>
                                    {user.progress[lvl].weakAreas.length === 0 ? (
                                        <p className="text-gray-500 italic">No weak areas yet.</p>
                                    ) : (
                                        <ul className="ml-4 list-disc">
                                            {user.progress[lvl].weakAreas.map((area, idx) => (
                                                <li key={idx} className="text-red-500">
                                                    {area.topic} ({area.incorrectCount} incorrect)
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="pt-4 sm:pt-6 border-t mt-6 sm:mt-8 space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">What's Next?</h2>
                    {user.level === 1 && (
                        <p className="text-base sm:text-lg text-gray-600 text-center">You are currently on the Easy level. Complete it to unlock Medium questions.</p>
                    )}
                    {user.level === 2 && (
                        <p className="text-base sm:text-lg text-gray-600 text-center">Congratulations! You have unlocked the Medium level. Start your next quiz!</p>
                    )}
                    {user.level === 3 && (
                        <p className="text-base sm:text-lg text-gray-600 text-center">Great work! You have unlocked the Hard level. Challenge yourself with a new quiz.</p>
                    )}
                    
                    {/* Quiz + Logout row */}
                    <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-3 sm:gap-4">
                        <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
                            {renderQuizButton(1, 'Start Easy Quiz', user.level < 1)}
                            {renderQuizButton(2, 'Start Medium Quiz', user.level < 2)}
                            {renderQuizButton(3, 'Start Hard Quiz', user.level < 3)}
                        </div>

                        <button
                            onClick={handleLogout}
                            className="px-4 sm:px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
