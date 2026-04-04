const asyncHandler = require("../../utils/asyncHandler");
const { generateOTP } = require("../../utils/generateOTP");
const { signToken, createAuthResponse } = require("../../utils/jwt");
const { register, login, verifyEmail, resendOtp } = require("./auth.service");

/** POST /api/auth/register */
const registerHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await register({ name, email, password });
  res.status(201).json({ success: true, data: createAuthResponse(user) });
});

/** POST /api/auth/login */
const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await login({ email, password });
  if (!user.isVerified) {
    res.json({
      success: false,
      message: "Please verify your email. OTP has been sent if not received.",
      data: createAuthResponse(user),
    });
    return;
  }
  signToken(user._id, user.isVerified, res);
  res.json({ success: true, data: createAuthResponse(user) });
});

/** POST /api/auth/logout */
const logoutHandler = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully." });
});

/** POST /api/auth/verify-email */
const verifyHandler = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;
  const user = await verifyEmail({ otp, email });
  signToken(user._id, user.isVerified, res);
  res.json({ success: true, data: createAuthResponse(user) });
});

/** POST /api/auth/resend-otp */
const resendOtpHandler = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await resendOtp({ email });
  res.json({ success: true, message: "OTP resent successfully." });
});

module.exports = {
  resendOtpHandler,
  registerHandler,
  loginHandler,
  logoutHandler,
  verifyHandler,
};
