const { Router } = require("express");
const {
  registerHandler,
  loginHandler,
  logoutHandler,
} = require("./auth.controller");
const { protect } = require("../../middleware/auth.middleware");

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/logout", logoutHandler);
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
