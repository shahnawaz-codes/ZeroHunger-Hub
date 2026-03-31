const User = require("../user/user.model");
const AppError = require("../../utils/AppError");

/**
 * Register a new user and return a signed token.
 */
const register = async ({ name, email, password }) => {
  // Check for existing user early (before hashing) for a clear error
  const existing = await User.findOne({ email });
  if (existing) throw new AppError("Email already in use.", 409);

  const user = await User.create({ name, email, password });
  return user;
};

/**
 * Authenticate a user by email + password and return a signed token.
 */
const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Please provide email and password.", 400);
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError("Invalid email or password.", 401);
  }
  return user;
};

module.exports = { register, login };
