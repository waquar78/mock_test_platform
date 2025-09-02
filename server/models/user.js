import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 1, 
    },
    progress: {
  easy: {
    questionsAttempted: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    weakAreas: [
      { topic: String, incorrectCount: { type: Number, default: 0 } }
    ]
  },
  medium: {
    questionsAttempted: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    weakAreas: [
      { topic: String, incorrectCount: { type: Number, default: 0 } }
    ]
  },
  hard: {
    questionsAttempted: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    weakAreas: [
      { topic: String, incorrectCount: { type: Number, default: 0 } }
    ]
  }
},

    weakAreas: [
      {
        topic: String,
        incorrectCount: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;