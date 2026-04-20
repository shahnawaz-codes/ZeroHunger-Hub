const AppError = require("../../utils/AppError");
const User = require("../user/user.model");
const Restaurant = require("./restaurant.model");

const createRestaurant = async (data, userId) => {
  /** * Check if user already has a restaurant
   * If yes, throw an error
   * If no, create a new restaurant and update user role to "restaurant"
   */
  const existingRestaurant = await Restaurant.findOne({ owner: userId });

  if (existingRestaurant) {
    throw new AppError("User already has a restaurant", 401);
  }
  const restaurant = new Restaurant({ ...data, owner: userId });
  await User.findByIdAndUpdate(userId, { role: "restaurant" }, { new: true });
  await restaurant.save();
  return restaurant;
};
const myRestaurant = async (ownerId, restaurantId) => {
  const user = await User.findById(ownerId);
  if (user._id.toString() !== ownerId.toString()) {
    throw new Error("User is not the owner of this restaurant");
  }
  const restaurant = await Restaurant.findById(restaurantId);
  if (!restaurant) {
    throw new Error("Restaurant not found");
  }
  return restaurant;
};

module.exports = {
  createRestaurant,
  myRestaurant,
};
