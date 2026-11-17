import crypto from 'crypto';

/**
 * Generates an executive reference identifier for project inquiries.
 * Example: CYN-2026-9F4K8
 */
export const generateReferenceId = (prefix = 'CYN') => {
  const year = new Date().getFullYear();
  const randomChars = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `${prefix}-${year}-${randomChars}`;
};
