const Restaurant = require("../modules/Restaurant/restaurant.model");

/**
 * Middleware to attach the current restaurant to the request obj
 */
const attachRestaurant = async (req, res, next) => {
  // check if user is a restaurant and attach it to the request so that we can use it later in the controller
  if (req.user && req.user.role === "restaurant") {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    req.restaurant = restaurant;
  } else {
    req.restaurant = null;
  }

  next();
};
module.exports = attachRestaurant;
