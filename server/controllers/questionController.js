
import Question from "../models/questions.js";
import User from "../models/user.js";


export const getQuestions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currentLevel = user.level; 
    const questions = await Question.aggregate([
      { $match: { difficulty: currentLevel } },
      { $sample: { size: 10 } },
    ]);

    if (!questions || questions.length < 10) {
      return res.status(404).json({
        success: false,
        message: `Not enough questions available for level ${currentLevel}.`,
      });
    }

    res.status(200).json({ success: true, questions, level: currentLevel });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

//  Submit the entire quiz
export const submitQuiz = async (req, res) => {
  try {
    const { userAnswers } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currentLevel = user.level; 
    if (userAnswers.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Please answer all 10 questions.",
      });
    }

    let correctCount = 0;
    const answeredTopics = {}; // Track incorrect answers per topic

    for (const userAnswer of userAnswers) {
      const question = await Question.findById(userAnswer.questionId);
      if (!question) continue;

      const correctOption = question.options.find((opt) => opt.isCorrect);
      const isCorrect = correctOption.optionText === userAnswer.submittedAnswer;

      if (isCorrect) {
        correctCount += 1;
      } else {
        const topic = question.topic;
        answeredTopics[topic] = (answeredTopics[topic] || 0) + 1;
      }
    }

    //  Update per-level progress
    const levelKey =
      currentLevel === 1 ? "easy" : currentLevel === 2 ? "medium" : "hard";

    user.progress[levelKey].questionsAttempted += userAnswers.length;
    user.progress[levelKey].correctAnswers += correctCount;

    //  Update weak areas only for this level
    for (const topic in answeredTopics) {
      const weakArea = user.progress[levelKey].weakAreas.find(
        (w) => w.topic === topic
      );
      if (weakArea) {
        weakArea.incorrectCount += answeredTopics[topic];
      } else {
        user.progress[levelKey].weakAreas.push({
          topic,
          incorrectCount: answeredTopics[topic],
        });
      }
    }

    //  Store latest score
    user.progress[levelKey].score = correctCount;

    //  Unlock logic (adaptive)
    if (currentLevel === 1 && user.progress.easy.score >= 7) {
      user.level = 2;
      console.log(`User ${user.name} unlocked Medium difficulty!`);
    } else if (currentLevel === 2 && user.progress.medium.score >= 7) {
      user.level = 3;
      console.log(`User ${user.name} unlocked Hard difficulty!`);
    }

    await user.save();

    //  Send back results
    res.status(200).json({
      success: true,
      message: "Quiz submitted successfully!",
      score: correctCount,
      totalQuestions: userAnswers.length,
      weakAreas: user.progress[levelKey].weakAreas,
      newLevel: user.level,
    });
  } catch (error) {
    console.error("Submit quiz error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit quiz",
      error: error.message,
    });
  }
};
