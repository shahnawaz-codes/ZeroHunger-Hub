const asyncHandler = require("../../utils/asyncHandler");
const { myRestaurant, createRestaurant } = require("./restaurant.service");

/**
 * @desc    Create a new restaurant
 * @route   POST /api/restaurants
 * @access  Private
 */
const handleCreateRestaurant = asyncHandler(async (req, res) => {
  const { name, address, cuisine } = req.body;
  let payload = { name, address, cuisine };
  const restaurant = await createRestaurant(payload, req.user?._id);

  res.status(201).json({ success: true, data: restaurant });
});

/**
 * @desc    Get the restaurant owned by the authenticated user
 * @route   GET /api/restaurants/my
 * @access  Private
 */
const handleMyRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await myRestaurant(req.user?._id);
  res.status(200).json({ success: true, data: restaurant });
});

module.exports = {
  handleCreateRestaurant,
  handleMyRestaurant,
};
