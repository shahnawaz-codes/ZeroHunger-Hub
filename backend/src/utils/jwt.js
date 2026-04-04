const jwt = require("jsonwebtoken");

/**
 * Sign a JWT token for a given user id.
 */
const signToken = (id, isVerified, res) => {
  const token = jwt.sign({ id, isVerified }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
  return res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
/**
 * Verify a JWT token and return the decoded payload.
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Build a sanitized auth response object (no password).
 */
const createAuthResponse = (user) => ({
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVerified: user.isVerified,
    createdAt: user.createdAt,
  },
});

module.exports = { signToken, verifyToken, createAuthResponse };
