const AppError = require("../../utils/AppError");
const updateOrderStatus = require("../../utils/orderStatusHandler");
const Food = require("../food/food.model");
const Order = require("./order.model");

const createOrder = async (selectedFoods, pickupSlot, userId) => {
  // Validate selectedFoods is a non-empty array
  if (!Array.isArray(selectedFoods)) {
    throw new AppError("selectedFoods must be an array", 400);
  }
  if (!Array.isArray(selectedFoods) || selectedFoods.length === 0) {
    throw new AppError("selectedFoods must contain at least one item", 400);
  }

  // Validate each item has valid foodId and positive quantity
  const hasValidFoods = selectedFoods.every(
    (item) =>
      item.foodId || Number.isInteger(item.quantity) || item.quantity > 0,
  );
  if (!hasValidFoods) {
    throw new AppError(
      "selectedFoods must have valid foodId and quantity",
      400,
    );
  }

  // Validate pickupSlot exists
  if (!pickupSlot) {
    throw new AppError("pickupSlot is required", 400);
  }

  // Validate pickupSlot.start and pickupSlot.end are present
  if (!pickupSlot.start || !pickupSlot.end) {
    throw new AppError("pickupSlot must have both start and end times", 400);
  }

  // Validate pickupSlot dates are parseable
  const startTime = new Date(pickupSlot.start);
  const endTime = new Date(pickupSlot.end);
  if (isNaN(startTime.getTime())) {
    throw new AppError("pickupSlot.start must be a valid date", 400);
  }
  if (isNaN(endTime.getTime())) {
    throw new AppError("pickupSlot.end must be a valid date", 400);
  }

  // Validate start < end and start is not in the past
  if (startTime >= endTime) {
    throw new AppError("pickupSlot.start must be before pickupSlot.end", 400);
  }
  if (startTime < new Date()) {
    throw new AppError("pickupSlot.start cannot be in the past", 400);
  }

  /**  get foodids to fetch foods data in just one db query*/
  const foodIds = selectedFoods.map((i) => i.foodId);

  // get all foods that user select
  const foods = await Food.find({
    _id: { $in: foodIds },
  });
  //if any id is invalid
  if (foods.length !== foodIds.length) {
    throw new AppError("some foods are invalid", 400);
  }
  // create array of object for order's items that user odered
  const items = foods.map((food) => {
    // get the each element quantity that requested from user coz db dont know this
    const quantity = selectedFoods.find((i) => i.foodId == food._id).quantity;
    return {
      quantity,
      food: food._id,
      //for snapshot
      name: food.name,
      price: food.pricing.discounted ?? food.pricing.original, // if discount is null/undefined return original
    };
  });
  //calculate total amount
  const totalAmount = items.reduce((sum, i) => {
    return sum + i.price * i.quantity;
  }, 0);

  const restaurantId = foods[0]?.restaurant; //assuming all food came from same restaurant
  // check if all items are from same restaurant if not it return false
  const isSameRestaurant = foods.every(
    (food) => food.restaurant.toString() === restaurantId.toString(),
  );
  if (!restaurantId || !isSameRestaurant) {
    throw new AppError("all items must be from the same restaurant", 400);
  }

  // Create a new order
  const order = new Order({
    user: userId,
    restaurant: restaurantId,
    items,
    pickupSlot,
    totalAmount,
  });
  return await order.save();
};

const myOrders = async (userId) => {
  const orders = await Order.find({ user: userId });
  if (!orders) {
    throw new AppError("orders not found", 404);
  }
  return orders;
};

const orderById = async (orderId, userId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  if (order.user.toString() !== userId.toString()) {
    throw new AppError("Unauthorized access", 403);
  }
  return order;
};

const cancelOrderByUser = async (orderId, userId) => {
  // find the order
  const order = await Order.findById(orderId);
  if (!order) {
    throw new AppError("order not found", 404);
    /**only one user can cancel who is order this food, nothing else*/
  } else if (order.user.toString() !== userId.toString()) {
    throw new AppError("you are not authorized to cancel order");
  }
  updateOrderStatus(order, "cancelled");
  await order.save();
};

///---------------------restaurant-----------------------///

const restaurantOrders = async (restaurantId) => {
  const orders = await Order.find({ restaurant: restaurantId });
  if (!orders) {
    throw new AppError("No orders found for this restaurant", 404);
  }
  return orders;
};
const updateStatus = async (orderId, restaurantId, newStatus) => {
  const order = await Order.findById(orderId);
  if (!order) throw new AppError("order not found", 404);
  const isAuthorized = order.restaurant.toString() === restaurantId.toString();
  if (!isAuthorized) {
    throw new AppError("you are not authorize to cancel this order");
  }
  updateOrderStatus(order, newStatus);
  return await order.save();
};

module.exports = {
  createOrder,
  myOrders,
  orderById,
  restaurantOrders,
  cancelOrderByUser,
  updateStatus,
};
