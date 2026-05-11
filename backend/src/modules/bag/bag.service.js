const AppError = require("../../utils/AppError");
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
const getAllbags = async () => {
  const bags = await Bag.find().populate("restaurant", "name cuisine");
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
