import express from 'express';
import { getProfile, login, logout, signup , refreshAccessToken } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route("/login").post(login)
router.route("/signup").post(signup)
router.route("/logout").post(authMiddleware,logout)
router.route("/profile").get(authMiddleware,getProfile)
router.route("/refresh-token").post(refreshAccessToken)

export default router;
