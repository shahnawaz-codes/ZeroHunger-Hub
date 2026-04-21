const asyncHandler = require("../../utils/asyncHandler");
const { getUserById, updateProfile } = require("./user.service");

/** GET /api/users/me */
const getMe = asyncHandler(async (req, res) => {
  const user = await getUserById(req.user._id);
  res.json({ success: true, data: user });
});

/** PATCH /api/users/me */
const updateMe = asyncHandler(async (req, res) => {
  const user = await updateProfile(req.user._id, req.body);
  res.json({ success: true, data: user });
});

module.exports = { getMe, updateMe };
