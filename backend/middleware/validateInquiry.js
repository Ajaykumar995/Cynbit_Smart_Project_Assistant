import { body, validationResult } from 'express-validator';

export const validateInquiry = [
  body('projectType')
    .trim()
    .notEmpty()
    .withMessage('Project type is required (e.g., Website, Web App, Mobile App, AI Automation, SaaS, Other)'),

  body('features')
    .isArray()
    .withMessage('Features must be an array of selected capabilities'),

  body('budget')
    .trim()
    .notEmpty()
    .withMessage('Budget selection is required'),

  body('timeline')
    .trim()
    .notEmpty()
    .withMessage('Timeline selection is required'),

  body('contact.name')
    .trim()
    .notEmpty()
    .withMessage('Contact name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),

  body('contact.email')
    .trim()
    .notEmpty()
    .withMessage('Contact email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('contact.phone')
    .optional({ values: 'falsy' })
    .trim()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/)
    .withMessage('Please provide a valid phone number format'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 3000 })
    .withMessage('Project description cannot exceed 3000 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please verify your inputs.',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
        })),
      });
    }
    next();
  },
];
