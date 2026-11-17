import express from 'express';
import {
  createInquiry,
  getInquiryById,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
} from '../controllers/inquiryController.js';
import { validateInquiry } from '../middleware/validateInquiry.js';

const router = express.Router();

// Admin summary statistics (placed before /:id)
router.get('/stats/summary', getInquiryStats);

// Main inquiry endpoints
router.route('/')
  .post(validateInquiry, createInquiry)
  .get(getAllInquiries);

// Individual inquiry endpoints
router.route('/:id')
  .get(getInquiryById)
  .delete(deleteInquiry);

// Status and notes update
router.patch('/:id/status', updateInquiryStatus);

export default router;
