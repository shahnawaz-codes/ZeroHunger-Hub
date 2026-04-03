const { Router } = require("express");
const {
  registerHandler,
  loginHandler,
  logoutHandler,
  verifyHandler,
  resendOtpHandler,
} = require("./auth.controller");
const { protect } = require("../../middleware/auth.middleware");
const { verify } = require("jsonwebtoken");

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.post("/verify-email", verifyHandler); // Endpoint for email verification
router.post("/resend-otp", resendOtpHandler);
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
