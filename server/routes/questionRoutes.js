
import { getQuestions, submitQuiz } from "../controllers/questionController.js";
import { verifyToken } from "../utils/middleware.js";
import express from "express";

const router = express.Router();

router.get("/getquestions", verifyToken, getQuestions);

router.post("/submitquiz", verifyToken, submitQuiz);

export default router;