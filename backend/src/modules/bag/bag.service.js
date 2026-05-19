const AppError = require("../../utils/AppError");
const Restaurant = require("../Restaurant/restaurant.model");
const Bag = require("./bag.model");

const createbag = async (data, restaurantId) => {
  const {
    name,
    description,
    pricing, // {original, discounted}
    category,
    quantity, // {total}
    pickupWindow, //{start, end}
    expiryTime,
    tags,
  } = data;

  const { original, discounted } = pricing;
  if (discounted > original) {
    throw new AppError(
      "original price should be greater than discounted price ",
      400,
    );
  }
  const bag = await Bag.create({
    name,
    description,
    pricing,
    quantity: {
      total: quantity,
    },
    restaurant: restaurantId,
    category,
    pickupWindow,
    expiryTime,
    tags,
  });
  return bag;
};
const Mybags = async (restaurantId) => {
  const bags = await Bag.find({ restaurant: restaurantId });
  return bags;
};

///------------------ public route--------------------
const getAllbags = async (lng, lat, radius) => {
  const lngNum = parseFloat(lng);
  const latNum = parseFloat(lat);
  if (!lngNum || !latNum) {
    throw new AppError("location is required", 400);
  }
  if (isNaN(lngNum) || isNaN(latNum)) {
    throw new AppError("Invalid location coordinates", 400);
  }
  const radiusInMeters = parseFloat(radius) ? parseFloat(radius) * 1000 : 5000; // default to 5km if radius is not provided

  // Find restaurants within the specified radius of the given location
  const restaurant = await Restaurant.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lngNum, latNum],
        },
        $maxDistance: radiusInMeters,
      },
    },
  }).select("_id");
  console.log(restaurant);

  if (restaurant.length === 0) {
    return [];
  }
  const restaurantIds = restaurant.map((r) => r._id);
  // $gt = greater than, $in = matches any of the values specified in an array
  // Find bags that are available (not expired, pickup window not ended, quantity left > 0) from these restaurants
  const bags = await Bag.find({
    restaurant: { $in: restaurantIds },
    // expiryTime: { $gt: new Date() },
    // "pickupWindow.end": { $gt: new Date() }, // Ensure pickup window has not ended
    // "quantity.left": { $gt: 0 },
  })
    .populate({
      path: "restaurant",
      select: " name cuisine address",
    })
    .sort({ "pickupWindow.end": 1 }); // Sort by pickup window end time (soonest first) means that bags that are expiring soon will be shown first 1 = ascending order
  return bags;
};
const getbagById = async (bagId) => {
  const bag = await Bag.findById(bagId).populate(
    "restaurant",
    "name cuisine address",
  );
  if (!bag) {
    throw new AppError("bag item not found.", 404);
  }
  return bag;
};
module.exports = {
  createbag,
  getAllbags,
  getbagById,
  Mybags,
};
