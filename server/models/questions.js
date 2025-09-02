import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    options: [
      {
        optionText: String,
        isCorrect: { type: Boolean, default: false },
      },
    ],
    difficulty: {
      type: Number, 
      default: 1,
    },
    topic: {
      type: String, 
      required: true,
    },
     marks: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
