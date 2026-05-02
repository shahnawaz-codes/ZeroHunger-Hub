const User = require("./user.model");
const AppError = require("../../utils/AppError");

/**
 * Retrieves a user by their ID from the database.
 * Password field is automatically excluded by User model.
 *
 * @async
 * @function getUserById
 * @param {string|ObjectId} id - User's MongoDB ID
 *
 * @returns {Promise<Object>} User document (without password)
 *
 * @throws {AppError} 404 - User not found
 *
 * @description
 * - Queries User collection by _id
 * - Returns complete user object except password
 * - Includes: name, email, role, isVerified, timestamps
 * - Used in getMe endpoint and profile fetching
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError("User not found.", 404);
  return user;
};

/**
 * Updates user profile with whitelisted fields.
 * Only allows updating specific fields (currently name only).
 *
 * @async
 * @function updateProfile
 * @param {string|ObjectId} id - User's MongoDB ID
 * @param {Object} data - Raw update data from request body
 * @param {string} [data.name] - New user name
 *
 * @returns {Promise<Object>} Updated user document
 *
 * @throws {AppError} 404 - User not found
 * @throws {ValidationError} - If name fails schema validation
 *
 * @description
 * - Whitelists allowed fields (security measure)
 * - Currently only 'name' can be updated
 * - Email, role, password require separate endpoints
 * - Runs Mongoose validators (maxlength, trim, required)
 * - Uses findByIdAndUpdate with new: true to return updated doc
 * - Returns updated user object
 *
 * Whitelisting:
 * - email: NOT allowed (would require re-verification)
 * - role: NOT allowed (role changes require admin action)
 * - password: NOT allowed (has dedicated endpoint)
 * - OTP fields: NOT allowed (managed by auth)
 *
 * @example
 * // Update user's name
 * const updated = await updateProfile(userId, { name: 'Jane Doe' });
 * // Throws 404 if user doesn't exist
 * // Throws validation error if name is too long
 */
const updateProfile = async (id, data) => {
  const allowed = { name: data.name }; // whitelist
  const user = await User.findByIdAndUpdate(id, allowed, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new AppError("User not found.", 404);
  return user;
};

module.exports = { getUserById, updateProfile };
