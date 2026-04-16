const AppError = require("../../utils/AppError");
const Food = require("./food.model");
const createFood = (data, restaurantId) => {
  const { name, description, price, quantity, expiryDate } = data;
  if (!name || !price || !quantity) {
    throw new AppError(
      "Name, price, and quantity are required to create a food item.",
      400,
    );
  }
  const food = Food.create({
    name,
    description,
    price,
    quantity,
    expiryDate,
    restaurant: restaurantId,
  });
  return food;
};
const getAllFoods = () => {
  const food = Food.find().populate("restaurant", "name");
  return food;
};
const getFoodById = (id) => {
  const food = Food.findById(id).populate("restaurant", "name");
  if (!food) {
    throw new AppError("Food item not found.", 404);
  }
  return food;
};
module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
};
