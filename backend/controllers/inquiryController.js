import mongoose from 'mongoose';
import { ProjectInquiry } from '../models/ProjectInquiry.js';
import { generateReferenceId } from '../utils/generateReferenceId.js';
import { calculateProjectScope } from '../utils/scopeEstimator.js';

// In-memory fallback repository (ensures prototype never returns 500 even during database reconnects)
const inMemoryInquiries = [];

const isDbConnected = () => mongoose.connection.readyState === 1;

/**
 * @desc    Submit a new project inquiry
 * @route   POST /api/inquiries
 * @access  Public
 */
export const createInquiry = async (req, res, next) => {
  try {
    const { projectType, features, budget, timeline, contact, description } = req.body;

    const referenceId = generateReferenceId('CYN');
    const estimatedScope = calculateProjectScope(projectType, features, budget, timeline);

    const inquiryPayload = {
      referenceId,
      projectType,
      features: features || [],
      budget,
      timeline,
      contact: {
        name: contact?.name || '',
        email: contact?.email || '',
        phone: contact?.phone || '',
        company: contact?.company || '',
        preferredContact: contact?.preferredContact || 'Email',
      },
      description: description || '',
      estimatedScope,
      status: 'Submitted',
      clientNotes: '',
    };

    if (isDbConnected()) {
      try {
        const inquiry = new ProjectInquiry(inquiryPayload);
        const savedInquiry = await inquiry.save();
        return res.status(201).json({
          success: true,
          message: 'Project inquiry submitted successfully',
          data: savedInquiry,
        });
      } catch (dbErr) {
        console.warn('[DB Fallback] Failed saving to MongoDB, persisting to memory cache:', dbErr.message);
      }
    }

    // In-memory fallback
    const fallbackRecord = {
      ...inquiryPayload,
      _id: new mongoose.Types.ObjectId().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isCachedInMemory: true,
    };
    inMemoryInquiries.unshift(fallbackRecord);

    return res.status(201).json({
      success: true,
      message: 'Project inquiry submitted successfully',
      data: fallbackRecord,
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
    const cleanId = id.toUpperCase();

    if (isDbConnected()) {
      try {
        let query = {};
        if (mongoose.Types.ObjectId.isValid(id)) {
          query = { $or: [{ _id: id }, { referenceId: cleanId }] };
        } else {
          query = { referenceId: cleanId };
        }

        const inquiry = await ProjectInquiry.findOne(query);
        if (inquiry) {
          return res.status(200).json({ success: true, data: inquiry });
        }
      } catch (err) {
        console.warn('[DB Error] Failed fetching inquiry from MongoDB:', err.message);
      }
    }

    // Fallback to in-memory search
    const memoryRecord = inMemoryInquiries.find(
      (item) => item.referenceId === cleanId || item._id === id
    );

    if (!memoryRecord) {
      return res.status(404).json({
        success: false,
        message: `No project inquiry found with reference or ID: "${id}"`,
      });
    }

    res.status(200).json({
      success: true,
      data: memoryRecord,
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

    if (isDbConnected()) {
      try {
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
        if (status && status !== 'All') filter.status = status;
        if (projectType && projectType !== 'All') filter.projectType = projectType;

        const inquiries = await ProjectInquiry.find(filter)
          .sort({ createdAt: -1 })
          .limit(Number(limit));

        const totalCount = await ProjectInquiry.countDocuments(filter);

        return res.status(200).json({
          success: true,
          count: inquiries.length,
          total: totalCount,
          data: inquiries,
        });
      } catch (err) {
        console.warn('[DB Fallback] Failed querying inquiries from MongoDB, using memory cache:', err.message);
      }
    }

    // In-memory filtered response
    let filtered = [...inMemoryInquiries];
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.referenceId?.toLowerCase().includes(q) ||
          i.contact?.name?.toLowerCase().includes(q) ||
          i.contact?.email?.toLowerCase().includes(q) ||
          i.projectType?.toLowerCase().includes(q)
      );
    }
    if (status && status !== 'All') {
      filtered = filtered.filter((i) => i.status === status);
    }
    if (projectType && projectType !== 'All') {
      filtered = filtered.filter((i) => i.projectType === projectType);
    }

    res.status(200).json({
      success: true,
      count: filtered.length,
      total: filtered.length,
      data: filtered.slice(0, Number(limit)),
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
    const cleanId = id.toUpperCase();

    const updateFields = {};
    if (status) updateFields.status = status;
    if (clientNotes !== undefined) updateFields.clientNotes = clientNotes;

    if (isDbConnected()) {
      try {
        let query = {};
        if (mongoose.Types.ObjectId.isValid(id)) {
          query = { $or: [{ _id: id }, { referenceId: cleanId }] };
        } else {
          query = { referenceId: cleanId };
        }

        const updated = await ProjectInquiry.findOneAndUpdate(
          query,
          { $set: updateFields },
          { new: true, runValidators: true }
        );

        if (updated) {
          return res.status(200).json({
            success: true,
            message: 'Inquiry status updated successfully',
            data: updated,
          });
        }
      } catch (err) {
        console.warn('[DB Fallback] Failed updating MongoDB, attempting memory update:', err.message);
      }
    }

    // In-memory update
    const memoryIndex = inMemoryInquiries.findIndex(
      (i) => i.referenceId === cleanId || i._id === id
    );

    if (memoryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found to update',
      });
    }

    inMemoryInquiries[memoryIndex] = {
      ...inMemoryInquiries[memoryIndex],
      ...updateFields,
      updatedAt: new Date().toISOString(),
    };

    res.status(200).json({
      success: true,
      message: 'Inquiry status updated successfully (cached)',
      data: inMemoryInquiries[memoryIndex],
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
    const cleanId = id.toUpperCase();

    if (isDbConnected()) {
      try {
        let query = {};
        if (mongoose.Types.ObjectId.isValid(id)) {
          query = { $or: [{ _id: id }, { referenceId: cleanId }] };
        } else {
          query = { referenceId: cleanId };
        }

        const deleted = await ProjectInquiry.findOneAndDelete(query);
        if (deleted) {
          return res.status(200).json({
            success: true,
            message: `Inquiry ${deleted.referenceId} deleted successfully`,
          });
        }
      } catch (err) {
        console.warn('[DB Error] Failed deleting from MongoDB:', err.message);
      }
    }

    // In-memory delete
    const memoryIndex = inMemoryInquiries.findIndex(
      (i) => i.referenceId === cleanId || i._id === id
    );

    if (memoryIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found to delete',
      });
    }

    const removed = inMemoryInquiries.splice(memoryIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: `Inquiry ${removed.referenceId} deleted successfully`,
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
    if (isDbConnected()) {
      try {
        const total = await ProjectInquiry.countDocuments();
        const submitted = await ProjectInquiry.countDocuments({ status: 'Submitted' });
        const inReview = await ProjectInquiry.countDocuments({ status: 'In Review' });
        const discovery = await ProjectInquiry.countDocuments({ status: 'Discovery Scheduled' });
        const proposalReady = await ProjectInquiry.countDocuments({ status: 'Proposal Ready' });

        const byType = await ProjectInquiry.aggregate([
          { $group: { _id: '$projectType', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]);

        const byBudget = await ProjectInquiry.aggregate([
          { $group: { _id: '$budget', count: { $sum: 1 } } },
          { $sort: { count: -1 } },
        ]);

        return res.status(200).json({
          success: true,
          data: {
            total,
            statusCounts: { submitted, inReview, discovery, proposalReady },
            byType,
            byBudget,
          },
        });
      } catch (err) {
        console.warn('[DB Fallback] Failed querying stats from MongoDB, computing from memory cache:', err.message);
      }
    }

    // In-memory stats calculation
    const total = inMemoryInquiries.length;
    const submitted = inMemoryInquiries.filter((i) => i.status === 'Submitted').length;
    const inReview = inMemoryInquiries.filter((i) => i.status === 'In Review').length;
    const discovery = inMemoryInquiries.filter((i) => i.status === 'Discovery Scheduled').length;
    const proposalReady = inMemoryInquiries.filter((i) => i.status === 'Proposal Ready').length;

    res.status(200).json({
      success: true,
      data: {
        total,
        statusCounts: { submitted, inReview, discovery, proposalReady },
        byType: [],
        byBudget: [],
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

/**
 * @desc    Admin login verification
 * @route   POST /api/inquiries/admin/login
 * @access  Public
 */
export const adminLogin = async (req, res) => {
  const { password } = req.body;
  const adminKey = process.env.ADMIN_KEY || 'cynbit2026';

  if (!password || password !== adminKey) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator passcode. Access denied.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Admin authentication verified',
    token: adminKey,
  });
};
