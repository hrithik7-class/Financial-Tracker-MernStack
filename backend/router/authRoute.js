import express from 'express';
import { getProfile, login, logout, signup } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post("/login", login)
router.post("/signup", signup)
router.post('/logout', authMiddleware,logout)
router.get('/profile', authMiddleware, getProfile)

export default router;
