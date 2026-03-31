/**
 * Wraps an async route handler and forwards errors to Express error middleware.
 * Eliminates repetitive try-catch blocks in controllers.
 *
 * @param {Function} fn - Async route handler
 * @returns {Function} Express middleware
 */
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = asyncHandler;
