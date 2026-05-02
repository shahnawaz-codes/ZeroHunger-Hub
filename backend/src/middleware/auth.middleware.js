const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/jwt");
const User = require("../modules/user/user.model");

/**
 * Authentication middleware - protects routes and requires valid JWT token.
 * Verifies Bearer JWT from cookies and attaches authenticated user to req.user.
 *
 * @async
 * @function protect
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object
 * @param {Express.NextFunction} next - Express next middleware function
 *
 * @throws {AppError} 401 - If no token found in cookies
 * @throws {AppError} 401 - If token is invalid or expired
 * @throws {AppError} 401 - If user associated with token no longer exists
 *
 * @description
 * - Extracts JWT token from req.cookies.token
 * - Verifies token signature using JWT_SECRET
 * - Fetches user document from database (excluding password)
 * - Clears invalid token cookie if user not found
 * - Attaches user object to req.user for downstream handlers
 *
 * @example
 * // Protect a route
 * router.post('/protected-route', protect, controllerHandler);
 */
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) throw new AppError("No token found.", 401);
  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    res.clearCookie("token"); // Clear invalid token
    throw new AppError("User no longer exists.", 401);
  }
  req.user = user;
  next();
});

/**
 * Email verification middleware - requires user to have verified email.
 * Must be used after protect() middleware.
 *
 * @async
 * @function requireVerified
 * @param {Express.Request} req - Express request object (must have req.user from protect)
 * @param {Express.Response} res - Express response object
 * @param {Express.NextFunction} next - Express next middleware function
 *
 * @throws {AppError} 403 - If user's email is not verified (isVerified = false)
 *
 * @description
 * - Checks if req.user.isVerified is true
 * - Only allows access to verified email accounts
 * - Used for features that require verified email (e.g., orders, listings)
 *
 * @example
 * // Require verified email
 * router.post('/orders', protect, requireVerified, createOrder);
 */
const requireVerified = asyncHandler(async (req, res, next) => {
  if (!req.user.isVerified) {
    throw new AppError(
      "Please verify your email to access this resource.",
      403,
    );
  }
  next();
});

/**
 * Role-based access control middleware - restricts routes to specific user roles.
 * Must be used after protect() middleware.
 *
 * @function restrictTo
 * @param {...string} roles - One or more allowed roles (e.g., 'admin', 'restaurant', 'user')
 *
 * @returns {Express.Middleware} Express middleware function
 *
 * @throws {AppError} 403 - If user role is not in allowed roles list
 *
 * @description
 * - Checks if req.user.role is included in the roles parameter
 * - Denies access if user does not have required role
 * - Supports multiple roles for flexible permission management
 *
 * @example
 * // Allow only admins
 * router.delete('/admin-panel', protect, restrictTo('admin'), deleteUser);
 *
 * // Allow restaurants and admins
 * router.post('/restaurants', protect, restrictTo('restaurant', 'admin'), createRestaurant);
 */
const restrictTo =
  (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission.", 403));
    }
    next();
  };

module.exports = { protect, requireVerified, restrictTo };
