import express from 'express';
import {
  createInquiry,
  getInquiryById,
  getAllInquiries,
  updateInquiryStatus,
  deleteInquiry,
  getInquiryStats,
  adminLogin,
} from '../controllers/inquiryController.js';
import { validateInquiry } from '../middleware/validateInquiry.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin Authentication Login
router.post('/admin/login', adminLogin);

// Admin summary statistics (protected)
router.get('/stats/summary', requireAdminAuth, getInquiryStats);

// Main inquiry endpoints
router.route('/')
  .post(validateInquiry, createInquiry)
  .get(getAllInquiries);

// Individual inquiry endpoints
router.route('/:id')
  .get(getInquiryById)
  .delete(requireAdminAuth, deleteInquiry);

// Status and notes update (protected)
router.patch('/:id/status', requireAdminAuth, updateInquiryStatus);

export default router;
