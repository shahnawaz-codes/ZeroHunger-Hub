const asyncHandler = require("../../utils/asyncHandler");
const { signToken, createAuthResponse } = require("../../utils/jwt");
const { register, login } = require("./auth.service");

/** POST /api/auth/register */
const registerHandler = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await register({ name, email, password });
  const token = signToken(user._id, res);
  res.status(201).json({ success: true, data: createAuthResponse(user) });
});

/** POST /api/auth/login */
const loginHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await login({ email, password });
  signToken(user._id, res);
  res.json({ success: true, data: createAuthResponse(user) });
});

/** POST /api/auth/logout */
const logoutHandler = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out successfully." });
});

module.exports = { registerHandler, loginHandler, logoutHandler };
