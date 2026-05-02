/**
 * Generates a random 6-digit OTP (One-Time Password).
 * Used for email verification during registration and login.
 *
 * @function generateOTP
 * @returns {string} A 6-digit OTP as a string (e.g., "123456")
 *
 * @description
 * - Generates random number between 100000 and 999999
 * - Returns as string to preserve leading zeros
 * - Used for email verification codes
 * - Should be stored in database with expiration time (typically 5-10 minutes)
 *
 * @example
 * const otp = generateOTP();
 * console.log(otp); // "456789"
 *
 * // In auth service
 * const otp = generateOTP();
 * user.otp = otp;
 * user.otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
 * await user.save();
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = { generateOTP };
