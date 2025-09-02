import dotenv from "dotenv"; 
dotenv.config();

import { ques } from "./utils/questiondata.js";
import Question from "./models/questions.js"; // ✅ Corrected import
import connnectDb from "./config/db.js";

const seedData = async () => {  try {
   await connnectDb(); 
    console.log("Seeding questions...");
 
 await Question.deleteMany(); // ✅ Corrected usage
 await Question.insertMany(ques); // ✅ Corrected usage

   console.log("Questions seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedData();