const AppError = require("../../utils/AppError");
const updateOrderStatus = require("../../utils/orderStatusHandler");
const Bag = require("../bag/bag.model");
const Order = require("./order.model");

const createOrder = async (selectedbag, pickupWindow, userId) => {
  const { bagId, quantity } = selectedbag;
  // Validate bagId is present
  if (!bagId) {
    throw new AppError("bagId is required", 400);
  }
  const isValidQuantity =
    quantity && Number.isInteger(quantity) && quantity > 0 && quantity <= 2;
  if (!isValidQuantity) {
    throw new AppError(
      "quantity must be a positive integer between 1 and 2",
      400,
    );
  }
  // Validate pickupSlot exists
  if (!pickupWindow) {
    throw new AppError("pickupWindow is required", 400);
  }
  // Validate pickupWindow.start and pickupWindow.end are present
  else if (!pickupWindow.start || !pickupWindow.end) {
    throw new AppError("pickupWindow must have both start and end times", 400);
  }

  // Validate pickupWindow dates are parseable
  // these two convert into millisecodns
  const startTime = new Date(pickupWindow.start);
  const endTime = new Date(pickupWindow.end);
  if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
    throw new AppError("start and end time must be a valid date", 400);
  }
  // Validate start < end and start is not in the past
  if (startTime >= endTime) {
    throw new AppError(
      "invalid time range -> start time must be before end time",
      400,
    );
  }
  if (endTime < new Date()) {
    throw new AppError("bag is expired", 400);
    // TODO : update bag status
  }

  const bag = await Bag.findById(bagId);
  if (!bag) {
    throw new AppError("bag not found", 404);
  }
  const price = bag.pricing.discounted ?? bag.pricing.original;
  const item = {
    bag: bagId,
    quantity,
    name: bag.name, // snapshot
    price, // snapshot
  };

  // Create a new order
  const order = new Order({
    user: userId,
    restaurant: bag.restaurant,
    item,
    pickupWindow,
    totalAmount: price * quantity,
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
    /**only one user can cancel who is order this bag, nothing else*/
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
