import express from "express";
import dotenv from "dotenv";
import connnectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();
const app = express();

connnectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
     origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/result", resultRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});