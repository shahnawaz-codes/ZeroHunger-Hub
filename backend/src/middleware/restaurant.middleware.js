const Restaurant = require("../modules/Restaurant/restaurant.model");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Middleware to attach the current restaurant to the request obj
 */
const attachRestaurant = asyncHandler(async (req, res, next) => {
  // check if user is a restaurant and attach it to the request so that we can use it later in the controller
  if (req.user && req.user.role === "restaurant") {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    req.restaurant = restaurant;
  } else {
    req.restaurant = null;
  }

  next();
});
const requireRestaurant = asyncHandler(async (req, _res, next) => {
  if (!req.restaurant) {
    return next(
      new AppError("No restaurant profile found for this user.", 404),
    );
  }
  next();
});

module.exports = {attachRestaurant, requireRestaurant};
