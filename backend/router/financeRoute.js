import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getAllTranscation, addIncome, deleteTranscation, updateTranscation  } from '../controllers/financeController.js'

const router = express.Router()

router.get('/', authMiddleware, getAllTranscation)
router.post('/', authMiddleware, addIncome)
router.delete('/:id', authMiddleware, deleteTranscation)
router.put('/:id', authMiddleware, updateTranscation)

export default router;


