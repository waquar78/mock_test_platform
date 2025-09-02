import express from "express"
import { getUserResults, saveResult } from "../controllers/resultController.js";
import { verifyToken } from "../utils/middleware.js";
const router = express.Router() 

router.route("/save").post(verifyToken,saveResult);
router.route("/get").get(verifyToken,getUserResults);
 
export default router;