const Restaurant = require("../modules/Restaurant/restaurant.model");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

/**
 * Restaurant attachment middleware - queries and attaches restaurant to request.
 * Must be used after protect() middleware to have req.user available.
 *
 * @async
 * @function attachRestaurant
 * @param {Express.Request} req - Express request object (must have req.user from protect)
 * @param {Express.Response} res - Express response object
 * @param {Express.NextFunction} next - Express next middleware function
 *
 * @returns {void} Attaches req.restaurant to request object
 *
 * @description
 * - Checks if user has role 'restaurant' (req.user.role === 'restaurant')
 * - Queries Restaurant collection for document matching req.user._id as owner
 * - Sets req.restaurant to found document or null if not found/wrong role
 * - Continues to next middleware regardless of success/failure
 *
 * @example
 * // In restaurant routes
 * router.use(protect);
 * router.use(attachRestaurant);
 * router.get('/', getRestaurants); // now has access to req.restaurant
 */
const attachRestaurant = asyncHandler(async (req, res, next) => {
  // Check if user is a restaurant and attach it to the request
  // so that we can use it later in the controller
  if (req.user && req.user.role === "restaurant") {
    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    req.restaurant = restaurant;
  } else {
    req.restaurant = null;
  }

  next();
});

/**
 * Restaurant requirement middleware - ensures request has valid restaurant attached.
 * Must be used after attachRestaurant() middleware.
 * Blocks access if user does not have an associated restaurant profile.
 *
 * @async
 * @function requireRestaurant
 * @param {Express.Request} req - Express request object (must have req.restaurant from attachRestaurant)
 * @param {Express.Response} _res - Express response object (unused)
 * @param {Express.NextFunction} next - Express next middleware function
 *
 * @throws {AppError} 404 - If req.restaurant is null or undefined
 *
 * @description
 * - Checks if req.restaurant exists (must be truthy)
 * - Used for restaurant-only routes (add food, manage orders, etc.)
 * - Prevents restaurants without profiles from accessing restaurant features
 * - Returns 404 "No restaurant profile found" if missing
 *
 * @example
 * // In restaurant food routes
 * router.post('/foods', protect, attachRestaurant, requireRestaurant, createFood);
 * // Only restaurant users with a profile can create food items
 */
const requireRestaurant = asyncHandler(async (req, _res, next) => {
  if (!req.restaurant) {
    return next(
      new AppError("No restaurant profile found for this user.", 404),
    );
  }
  next();
});

module.exports = { attachRestaurant, requireRestaurant };
