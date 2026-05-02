/**
 * Higher-order function that wraps async route handlers and forwards errors.
 * Eliminates the need for repetitive try-catch blocks in controllers.
 *
 * Errors caught here are forwarded to Express error handling middleware
 * via next(error), which routes them to the global errorHandler.
 *
 * @function asyncHandler
 * @param {Function} fn - Async route handler function
 *                        Signature: async (req, res, next) => void
 *
 * @returns {Function} Express middleware function
 *                     Signature: async (req, res, next) => void
 *
 * @description
 * - Wraps async route handlers to catch Promise rejections
 * - Forwards caught errors to Express error middleware via next(error)
 * - Allows controllers to throw AppError without try-catch
 * - Ensures all async errors are handled consistently
 * - Critical for proper error handling flow
 *
 * Error Flow:
 * 1. Controller throws error (or returns rejected Promise)
 * 2. asyncHandler catches error
 * 3. Passes to next(error)
 * 4. Express routes to errorHandler middleware
 * 5. Error response sent to client
 *
 * @example
 * // In controller WITHOUT asyncHandler (verbose)
 * const getUser = async (req, res, next) => {
 *   try {
 *     const user = await User.findById(req.params.id);
 *     if (!user) throw new AppError('User not found', 404);
 *     res.json(user);
 *   } catch (err) {
 *     next(err); // Must manually forward
 *   }
 * };
 *
 * // With asyncHandler (clean)
 * const getUser = asyncHandler(async (req, res) => {
 *   const user = await User.findById(req.params.id);
 *   if (!user) throw new AppError('User not found', 404);
 *   res.json(user);
 * });
 *
 * // Usage in routes
 * router.get('/:id', protect, asyncHandler(getUser));
 */
const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = asyncHandler;
