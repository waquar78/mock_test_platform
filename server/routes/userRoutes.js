import express from "express";
import { getUserProfile, login, logout, register } from "../controllers/userController.js";
import { verifyToken } from "../utils/middleware.js";

const router= express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout)
router.route("/getprofile").get(verifyToken,getUserProfile)

export default router;