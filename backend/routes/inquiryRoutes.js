import express from 'express';
import {
  createInquiry,
  getInquiryById,
  getAllInquiries,
} from '../controllers/inquiryController.js';
import { validateInquiry } from '../middleware/validateInquiry.js';

const router = express.Router();

// Inquiry routes
router.route('/')
  .post(validateInquiry, createInquiry)
  .get(getAllInquiries);

router.route('/:id')
  .get(getInquiryById);

export default router;
