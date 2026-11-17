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
 * @desc    Get all inquiries (with optional query filter)
 * @route   GET /api/inquiries
 * @access  Public / Admin prototype
 */
export const getAllInquiries = async (req, res, next) => {
  try {
    const { limit = 25, search } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { referenceId: { $regex: search, $options: 'i' } },
        { 'contact.name': { $regex: search, $options: 'i' } },
        { 'contact.email': { $regex: search, $options: 'i' } },
        { projectType: { $regex: search, $options: 'i' } },
      ];
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
