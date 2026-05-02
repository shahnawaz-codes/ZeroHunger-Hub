const asyncHandler = require("../../utils/asyncHandler");
const { getUserById, updateProfile } = require("./user.service");

/**
 * Get current authenticated user's profile.
 *
 * Route: GET /api/users/me
 * Authentication: Required (protect middleware)
 * Email Verification: Required (requireVerified middleware)
 *
 * @async
 * @function getMe
 * @param {Express.Request} req - Request object with req.user set by protect middleware
 * @param {Express.Response} res - Response object
 *
 * @returns {200} User profile object
 *
 * @description
 * - Fetches user document by ID from req.user._id
 * - Returns sanitized user data (no password)
 * - Includes: _id, name, email, role, isVerified, createdAt, updatedAt
 *
 * Response (200 OK):
 * ```json
 * {
 *   "success": true,
 *   "data": {
 *     "_id": "...",
 *     "name": "John Doe",
 *     "email": "john@example.com",
 *     "role": "user",
 *     "isVerified": true,
 *     "createdAt": "...",
 *     "updatedAt": "..."
 *   }
 * }
 * ```
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user._id);
  res.json({ success: true, data: user });
});

/**
 * Update current user's profile.
 *
 * Route: PATCH /api/users/me
 * Authentication: Required (protect middleware)
 * Email Verification: Required (requireVerified middleware)
 *
 * @async
 * @function updateMe
 * @param {Express.Request} req - Request object
 * @param {Object} req.body - Update payload
 * @param {string} [req.body.name] - New user name
 * @param {Express.Response} res - Response object
 *
 * @returns {200} Updated user profile
 *
 * @throws {404} User not found (shouldn't happen if middleware works)
 *
 * @description
 * - Updates user profile with provided data
 * - Currently supports name updates (field is whitelisted)
 * - Runs Mongoose schema validators
 * - Returns updated user object
 * - Other fields (email, role) cannot be updated via this endpoint
 *
 * @example
 * // Update user's name
 * PATCH /api/users/me
 * Content-Type: application/json
 * Authorization: Bearer <token>
 *
 * {
 *   "name": "Jane Doe"
 * }
 */
const updateMe = asyncHandler(async (req, res) => {
  const user = await updateProfile(req.user._id, req.body);
  res.json({ success: true, data: user });
});

module.exports = { getMe, updateMe };
