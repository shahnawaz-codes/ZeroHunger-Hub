const asyncHandler = require("../../utils/asyncHandler");
const { createFood, getAllFoods, getFoodById, Myfoods } = require("./food.service");

//----------------- restaurant ----------------------
/**
 * @desc    Create a new food
 * @route   POST /api/restaurant/foods
 * @access  Private (restaurant)
 * */
const createHandler = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    pricing,
    category,
    quantity,
    pickupSlots,
    expiryTime,
    tags,
  } = req.body;
  let payload = {
    name,
    description,
    pricing,
    category,
    quantity,
    pickupSlots,
    expiryTime,
    tags,
  };
  const food = await createFood(payload, req.restaurant._id);
  res.status(201).json({ success: true, data: food });
});

/**
 * @desc Get All Restaurant Added Foods
 * @route GET /api/foods/my
 * @access Private (restaurant)
 * */
const MyfoodsHandler = asyncHandler(async (req, res) => {
  const foods = await Myfoods(req?.restaurant._id);
  res.status(200).json({ success: true, data: foods });
});

//------------------------ user ---------------------------
/**
 * @desc    Get all foods
 * @route   GET /api/foods
 * @access  Public
 */
const allFoodsHandler = asyncHandler(async (req, res) => {
  const foods = await getAllFoods();
  res.json({ success: true, data: foods });
});

/**
 * @desc    Get food by id
 * @route   GET /api/foods/:id
 * @access  Public
 */
const foodByIdHandler = asyncHandler(async (req, res) => {
  console.log(req.params.foodId)
  const food = await getFoodById(req.params.foodId);
  res.json({ success: true, data: food });
});

module.exports = {
  createHandler,
  allFoodsHandler,
  foodByIdHandler,
  MyfoodsHandler,
};
