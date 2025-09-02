import Result from "../models/result.js";
import User from "../models/user.js";

// Save quiz result
export const saveResult = async (req, res) => {
  try {
    const { score, totalQuestions, correctAnswers, incorrectAnswers, attemptedQuestions, level } = req.body;
    const userId = req.userId; // From auth middleware

    const result = new Result({
      user: userId,
      score,
      totalQuestions,
      correctAnswers,
      incorrectAnswers,
      attemptedQuestions,
      level, // store which level this result is for
    });

    await result.save();

    // Update user progress per-level
    const levelKey = level === 1 ? "progress.easy" : level === 2 ? "progress.medium" : "progress.hard";

    await User.findByIdAndUpdate(userId, {
      $inc: {
        [`${levelKey}.questionsAttempted`]: totalQuestions,
        [`${levelKey}.correctAnswers`]: correctAnswers,
      },
      $set: {
        [`${levelKey}.score`]: score, // store score for last quiz
      },
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Save result error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user results
export const getUserResults = async (req, res) => {
    try {
        const userId = req.userId;
        const results = await Result.find({ user: userId }).populate("user", "name email");
        res.json(results);
    } catch (error) {
        console.error("Get results error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
