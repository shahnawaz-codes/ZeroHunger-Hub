const AppError = require("../../utils/AppError");
const Food = require("./food.model");

const createFood = async (data, restaurantId) => {
  const {
    name,
    description,
    pricing, // {original, discounted}
    expiryDate,
    category,
    totalQuantity,
    pickupSlots, //[{start, end}]
    expiryTime,
    tags,
  } = data;
  const { original, discount } = pricing;
  if (discount > original) {
    throw new AppError("price should be greater than discount ", 400);
  }
  const food = await Food.create({
    name,
    description,
    pricing,
    quantity: {
      total: totalQuantity,
    },
    expiryDate,
    restaurant: restaurantId,
    category,
    pickupSlots,
    expiryTime,
    tags,
  });
  return food;
};
const Myfoods = async (restaurantId) => {
  const foods = await Food.find({ restaurant: restaurantId });
  return foods;
};

///------------------ public route--------------------
const getAllFoods = async () => {
  const foods = await Food.find().populate("restaurant", "name cuisine");
  return foods;
};
const getFoodById = async (foodId) => {
  const food = await Food.findById(foodId).populate(
    "restaurant",
    "name cuisine address",
  );
  if (!food) {
    throw new AppError("Food item not found.", 404);
  }
  return food;
};
module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  Myfoods,
};
