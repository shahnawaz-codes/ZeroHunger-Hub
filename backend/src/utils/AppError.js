/**
 * Custom operational error class for application-specific errors.
 *
 * Pass instances to next() inside controllers — they'll be caught by asyncHandler
 * and forwarded to the global errorHandler middleware.
 *
 * @class AppError
 * @extends Error
 *
 * @param {string} message - Error message displayed to client
 * @param {number} [statusCode=500] - HTTP status code (default: 500)
 *
 * @property {string} message - Error message
 * @property {number} statusCode - HTTP response status code
 * @property {boolean} isOperational - Flag indicating error is operational (known)
 *
 * @description
 * - isOperational flag differentiates expected errors from programming errors
 * - Status code determines HTTP response status
 * - errorHandler middleware respects isOperational flag
 * - In production, unhandled errors (isOperational=false) don't expose stack traces
 * - In development, all errors including stack traces are logged
 *
 * Error Handling Flow:
 * 1. Service/Controller throws AppError
 * 2. asyncHandler catches and passes to next(error)
 * 3. errorHandler middleware checks isOperational
 * 4. Responds with statusCode and message
 *
 * @example
 * // Authentication error
 * throw new AppError('Invalid email or password', 401);
 *
 * // Not found error
 * if (!user) throw new AppError('User not found', 404);
 *
 * // Validation error
 * throw new AppError('Email already in use', 409);
 *
 * // Bad request
 * throw new AppError('Please provide email and password', 400);
 *
 * // In route handler
 * const loginHandler = asyncHandler(async (req, res) => {
 *   const { email, password } = req.body;
 *   const user = await login({ email, password }); // Throws AppError
 *   res.json({ success: true, data: user });
 * });
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
