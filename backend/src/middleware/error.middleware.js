const AppError = require("../utils/AppError");

/**
 * 404 Not Found middleware - catches all unmatched routes.
 * Must be placed after all defined routes in app.js
 *
 * @function notFound
 * @param {Express.Request} req - Express request object
 * @param {Express.Response} res - Express response object (unused)
 * @param {Express.NextFunction} next - Express next middleware function
 *
 * @description
 * - Called when no route matches the incoming request
 * - Creates an AppError with 404 status code
 * - Forwards error to global error handler via next(error)
 * - Returns JSON response with "Route not found" message
 *
 * @example
 * // In app.js - must be placed after all routes
 * app.use('/api/users', userRoutes);
 * // ... other routes ...
 * app.use(notFound); // catches all unmatched routes
 */
const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

/**
 * Global error handler middleware - centralizes error response formatting.
 * Must be the LAST middleware in app.js.
 * Handles all types of errors: operational, validation, auth, and unhandled.
 *
 * @function errorHandler
 * @param {Error} err - Error object (can be AppError or native Error)
 * @param {Express.Request} _req - Express request object (unused)
 * @param {Express.Response} res - Express response object
 * @param {Express.NextFunction} _next - Express next middleware function (unused)
 *
 * @returns {void} Sends JSON error response to client
 *
 * @description Handles error types:
 * 1. **Duplicate Key Errors (MongoDB)** - Converts to 409 Conflict
 *    - Extracted from nested keyValue object
 *    - User-friendly message: "Field already in use"
 *
 * 2. **Validation Errors (Mongoose)** - Converts to 400 Bad Request
 *    - Combines all field validation messages
 *    - Returns joined validation error messages
 *
 * 3. **JWT Invalid Token** - Returns 401 Unauthorized
 *    - Asks user to log in again
 *
 * 4. **JWT Expired Token** - Returns 401 Unauthorized
 *    - Instructs user to log in again
 *
 * 5. **Operational Errors (AppError)** - Returns configured statusCode
 *    - Custom errors thrown in services/controllers
 *
 * 6. **Unhandled Errors** - Returns 500 Internal Server Error
 *    - Logs full stack trace in development
 *    - Generic message in production
 *
 * Response Format:
 * ```json
 * {
 *   "success": false,
 *   "message": "Error description",
 *   "stack": "..." // Only in non-production environments
 * }
 * ```
 *
 * @example
 * // In app.js - must be the last middleware
 * app.use(notFound);
 * app.use(errorHandler); // after everything
 */
const errorHandler = (err, _req, res, _next) => {
  let { statusCode = 500, message, isOperational } = err;

  // Mongoose duplicate key error (e.g., duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already in use.`;
    statusCode = 409;
  }

  // Mongoose validation error (e.g., required field missing)
  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    statusCode = 400;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token. Please log in again.";
    statusCode = 401;
  }
  if (err.name === "TokenExpiredError") {
    message = "Your token has expired. Please log in again.";
    statusCode = 401;
  }

  // Log unhandled errors to console in development
  if (process.env.NODE_ENV !== "production" && !isOperational) {
    console.error("💥 UNHANDLED ERROR:", err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
