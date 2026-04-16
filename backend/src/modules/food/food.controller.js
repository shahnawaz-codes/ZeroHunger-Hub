const asyncHandler = require("../../utils/asyncHandler");
const { createFood, getAllFoods, getFoodById } = require("./food.service");
/** POST /api/foods */
const createHandler = asyncHandler(async (req, res) => {
  const food = await createFood(req.body || {}, req?.user?._id || null);
  res.json({ success: true, data: food });
});

/** GET /api/foods */
const allFoodsHandler = asyncHandler(async (req, res) => {
  const foods = await getAllFoods();
  res.json({ success: true, data: foods });
});

/** GET /api/foods/:id */
const foodByIdHandler = asyncHandler(async (req, res) => {
  const food = await getFoodById(req.params.id);
  res.json({ success: true, data: food });
});

module.exports = {
  createHandler,
  allFoodsHandler,
  foodByIdHandler,
};