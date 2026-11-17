import mongoose from 'mongoose';

const projectInquirySchema = new mongoose.Schema(
  {
    referenceId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    projectType: {
      type: String,
      required: [true, 'Project type is required'],
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    budget: {
      type: String,
      required: [true, 'Budget bracket is required'],
      trim: true,
    },
    timeline: {
      type: String,
      required: [true, 'Timeline is required'],
      trim: true,
    },
    contact: {
      name: {
        type: String,
        required: [true, 'Contact name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Contact email is required'],
        lowercase: true,
        trim: true,
        match: [
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          'Please provide a valid email address',
        ],
      },
      phone: {
        type: String,
        trim: true,
        default: '',
      },
      company: {
        type: String,
        trim: true,
        default: '',
      },
      preferredContact: {
        type: String,
        enum: ['Email', 'WhatsApp', 'Phone Call', 'Google Meet'],
        default: 'Email',
      },
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    estimatedScope: {
      complexity: { type: String, default: 'Moderate' },
      estimatedHours: { type: String, default: '80 - 140 Hours' },
      recommendedStack: { type: [String], default: [] },
      architectureStyle: { type: String, default: 'Layered Monolith' },
    },
    status: {
      type: String,
      enum: ['Submitted', 'In Review', 'Discovery Scheduled', 'Proposal Ready'],
      default: 'Submitted',
    },
    clientNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Optimize retrieval queries
projectInquirySchema.index({ createdAt: -1 });

export const ProjectInquiry = mongoose.model('ProjectInquiry', projectInquirySchema);
