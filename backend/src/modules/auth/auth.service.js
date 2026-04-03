const User = require("../user/user.model");
const AppError = require("../../utils/AppError");
const sendEmail = require("../../utils/sendMail");
const { generateOTP } = require("../../utils/generateOTP");

/**
 * Register a new user and return a signed token.
 */
const register = async ({ name, email, password }) => {
  // Check for existing user early (before hashing) for a clear error
  const existing = await User.findOne({ email });
  if (existing) throw new AppError("Email already in use.", 409);
  const otp = generateOTP(); // Generate OTP for email verification
  const user = await User.create({
    name,
    email,
    password,
    otp,
    otpExpires: Date.now() + 5 * 60 * 1000,
  }); // OTP valid for 5 minutes

  await sendEmail(
    email,
    "Verify your email",
    `Your verification code is: ${otp}`,
  );

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

/**
 * Verify a user's email using the OTP token.
 * This function is not fully implemented yet, but it will check the OTP and mark the user as verified.
 */
const verifyEmail = async ({ otp, email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found.", 404);
  }

  if (user.isVerified) {
    throw new AppError("Email already verified.", 400);
  }

  if (user.otp !== otp) {
    throw new AppError("Invalid OTP token.", 400);
  }

  if (user.otpExpires < Date.now()) {
    throw new AppError("OTP token has expired.", 400);
  }
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();
  return user;
};
const resendOtp = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found.", 404);
  }
  const otp = generateOTP();
  await sendEmail(
    email,
    "Verify your email",
    `resend Your verification code is: ${otp}`,
  );
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000;
  await user.save();
};
module.exports = { register, login, verifyEmail, resendOtp };
