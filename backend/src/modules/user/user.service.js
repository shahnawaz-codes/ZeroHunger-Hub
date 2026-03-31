const User = require('./user.model');
const AppError = require('../../utils/AppError');

/**
 * Return user by id (no password).
 */
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new AppError('User not found.', 404);
  return user;
};

/**
 * Update profile fields (name only for now; extend as needed).
 */
const updateProfile = async (id, data) => {
  const allowed = { name: data.name }; // whitelist
  const user = await User.findByIdAndUpdate(id, allowed, {
    new: true,
    runValidators: true,
  });
  if (!user) throw new AppError('User not found.', 404);
  return user;
};

module.exports = { getUserById, updateProfile };
