const AppError = require("../../utils/AppError");
const User = require("../user/user.model");
const Restaurant = require("./restaurant.model");

const createRestaurant = async (data, user) => {
  const { name, address, cuisine, coordinates } = data;
  /** * Check if user already has a restaurant
   * If yes, throw an error
   * If no, create a new restaurant and update user role to "restaurant"
   */

  // Reject if user already has a privileged role (cannot upgrade from admin/restaurant/etc)
  if (user.role !== "user") {
    throw new AppError("Only regular users can create a restaurant", 403);
  }

  const existingRestaurant = await Restaurant.findOne({ owner: user._id });

  if (existingRestaurant) {
    throw new AppError("User already has a restaurant", 400);
  }
  if (!name || !address || !cuisine || !coordinates) {
    throw new AppError(
      "name, address, cuisine and coordinates are required",
      400,
    );
  }
  const isValidCoordinates =
    typeof coordinates.lng === "number" &&
    typeof coordinates.lat === "number" &&
    !isNaN(coordinates.lng) &&
    !isNaN(coordinates.lat);

  if (!isValidCoordinates) {
    throw new AppError("Coordinates with valid lng and lat are required", 400);
  }
  const restaurant = new Restaurant({
    name,
    address,
    cuisine,
    location: {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    },
    owner: user._id,
  });
  await restaurant.save();
  await User.findByIdAndUpdate(user._id, { role: "restaurant" }, { new: true });
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
