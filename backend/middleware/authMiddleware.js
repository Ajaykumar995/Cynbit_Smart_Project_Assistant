/**
 * Admin Access Control Middleware
 * Protects administrative routes from unauthorized access.
 */
export const requireAdminAuth = (req, res, next) => {
  const adminKey = process.env.ADMIN_KEY || 'cynbit2026';

  const providedKey =
    req.headers['x-admin-key'] ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null);

  if (!providedKey || providedKey !== adminKey) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Invalid or missing administrator passkey.',
    });
  }

  next();
};
