import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllTranscation, addIncome, deleteTranscation, updateTranscation  } from '../controllers/financeController.js'

const router = express.Router();

router.route("/").get(authMiddleware, getAllTranscation);
router.route("/").post(authMiddleware, addIncome);
router.route("/:id").delete(authMiddleware, deleteTranscation);
router.route("/:id").put(authMiddleware, updateTranscation);

export default router;


