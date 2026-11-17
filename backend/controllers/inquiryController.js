import mongoose from 'mongoose';
import { ProjectInquiry } from '../models/ProjectInquiry.js';
import { generateReferenceId } from '../utils/generateReferenceId.js';
import { calculateProjectScope } from '../utils/scopeEstimator.js';

/**
 * @desc    Submit a new project inquiry
 * @route   POST /api/inquiries
 * @access  Public
 */
export const createInquiry = async (req, res, next) => {
  try {
    const { projectType, features, budget, timeline, contact, description } = req.body;

    // Generate unique reference ID
    let referenceId = generateReferenceId('CYN');
    let isUnique = false;
    let attempts = 0;

    // Guarantee uniqueness
    while (!isUnique && attempts < 5) {
      const existing = await ProjectInquiry.findOne({ referenceId });
      if (!existing) {
        isUnique = true;
      } else {
        referenceId = generateReferenceId('CYN');
        attempts++;
      }
    }

    // Compute scope, complexity & stack recommendation
    const estimatedScope = calculateProjectScope(projectType, features, budget, timeline);

    const inquiry = new ProjectInquiry({
      referenceId,
      projectType,
      features: features || [],
      budget,
      timeline,
      contact: {
        name: contact.name,
        email: contact.email,
        phone: contact.phone || '',
        company: contact.company || '',
        preferredContact: contact.preferredContact || 'Email',
      },
      description: description || '',
      estimatedScope,
      status: 'Submitted',
    });

    const savedInquiry = await inquiry.save();

    res.status(201).json({
      success: true,
      message: 'Project inquiry submitted successfully',
      data: savedInquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get inquiry by reference ID or MongoDB _id
 * @route   GET /api/inquiries/:id
 * @access  Public
 */
export const getInquiryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { referenceId: id.toUpperCase() }] };
    } else {
      query = { referenceId: id.toUpperCase() };
    }

    const inquiry = await ProjectInquiry.findOne(query);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: `No project inquiry found with reference or ID: "${id}"`,
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all inquiries (with optional query filter and pagination)
 * @route   GET /api/inquiries
 * @access  Public / Admin
 */
export const getAllInquiries = async (req, res, next) => {
  try {
    const { limit = 50, search, status, projectType } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { referenceId: { $regex: search, $options: 'i' } },
        { 'contact.name': { $regex: search, $options: 'i' } },
        { 'contact.email': { $regex: search, $options: 'i' } },
        { 'contact.company': { $regex: search, $options: 'i' } },
        { projectType: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (projectType && projectType !== 'All') {
      filter.projectType = projectType;
    }

    const inquiries = await ProjectInquiry.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    const totalCount = await ProjectInquiry.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: inquiries.length,
      total: totalCount,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update inquiry status and internal notes
 * @route   PATCH /api/inquiries/:id/status
 * @access  Admin
 */
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, clientNotes } = req.body;

    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { referenceId: id.toUpperCase() }] };
    } else {
      query = { referenceId: id.toUpperCase() };
    }

    const updateFields = {};
    if (status) updateFields.status = status;
    if (clientNotes !== undefined) updateFields.clientNotes = clientNotes;

    const updated = await ProjectInquiry.findOneAndUpdate(
      query,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found to update',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an inquiry
 * @route   DELETE /api/inquiries/:id
 * @access  Admin
 */
export const deleteInquiry = async (req, res, next) => {
  try {
    const { id } = req.params;

    let query = {};
    if (mongoose.Types.ObjectId.isValid(id)) {
      query = { $or: [{ _id: id }, { referenceId: id.toUpperCase() }] };
    } else {
      query = { referenceId: id.toUpperCase() };
    }

    const deleted = await ProjectInquiry.findOneAndDelete(query);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found to delete',
      });
    }

    res.status(200).json({
      success: true,
      message: `Inquiry ${deleted.referenceId} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get dashboard metrics & summary statistics
 * @route   GET /api/inquiries/stats/summary
 * @access  Admin
 */
export const getInquiryStats = async (req, res, next) => {
  try {
    const total = await ProjectInquiry.countDocuments();
    const submitted = await ProjectInquiry.countDocuments({ status: 'Submitted' });
    const inReview = await ProjectInquiry.countDocuments({ status: 'In Review' });
    const discovery = await ProjectInquiry.countDocuments({ status: 'Discovery Scheduled' });
    const proposalReady = await ProjectInquiry.countDocuments({ status: 'Proposal Ready' });

    // Group by project type
    const byType = await ProjectInquiry.aggregate([
      { $group: { _id: '$projectType', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Group by budget
    const byBudget = await ProjectInquiry.aggregate([
      { $group: { _id: '$budget', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        statusCounts: {
          submitted,
          inReview,
          discovery,
          proposalReady,
        },
        byType,
        byBudget,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    System health check
 * @route   GET /api/health
 * @access  Public
 */
export const getHealthCheck = async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  res.status(200).json({
    status: 'ok',
    service: 'Cynbit Smart Project Assistant API',
    database: dbStatus,
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())} seconds`,
  });
};
