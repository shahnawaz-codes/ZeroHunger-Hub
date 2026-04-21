const AppError = require("../../utils/AppError");
const User = require("../user/user.model");
const Restaurant = require("./restaurant.model");

const createRestaurant = async (data, userId) => {
  /** * Check if user already has a restaurant
   * If yes, throw an error
   * If no, create a new restaurant and update user role to "restaurant"
   */
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Reject if user already has a privileged role (cannot upgrade from admin/restaurant/etc)
  if (user.role !== "user") {
    throw new AppError("Only regular users can create a restaurant", 403);
  }

  const existingRestaurant = await Restaurant.findOne({ owner: userId });

  if (existingRestaurant) {
    throw new AppError("User already has a restaurant", 400);
  }
  const restaurant = new Restaurant({ ...data, owner: userId });
  await restaurant.save();
  await User.findByIdAndUpdate(userId, { role: "restaurant" }, { new: true });
  return restaurant;
};
const myRestaurant = async (userId) => {
  const restaurant = await Restaurant.findOne({
    owner: userId,
  });
  if (!restaurant) {
    throw new Error("Restaurant not found", 404);
  }
  return restaurant;
};

module.exports = {
  createRestaurant,
  myRestaurant,
};
