const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/jwt");
const User = require("../modules/user/user.model");

/**
 * Protect routes — verifies Bearer JWT and attaches req.user.
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
 * Middleware to ensure the user has a verified email before accessing certain routes.
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
 * Restrict access to specific roles.
 * Usage: router.get('/admin', protect, restrictTo('admin'), handler)
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
