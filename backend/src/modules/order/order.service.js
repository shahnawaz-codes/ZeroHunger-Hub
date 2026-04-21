const AppError = require("../../utils/AppError");
const updateOrderStatus = require("../../utils/orderStatusHandler");
const Food = require("../food/food.model");
const Order = require("./order.model");

const createOrder = async (selectedFoods, pickupSlot, userId) => {
  if (!selectedFoods || !pickupSlot) {
    throw new AppError("items or pickupSlot required");
  }
  // aussume start is like 7:00 PM and end is like 7:30 PM
  if (new Date(pickupSlot.start) >= new Date(pickupSlot.end)) {
    throw new AppError("invalid time range", 400);
    // always start time should be greater than or equal to current time means not in past
  } else if (new Date(pickupSlot.start) < new Date()) {
    throw new AppError("time cannot start in past", 400);
  }
  /**  get foodids to fetch foods data in just one db query*/
  const foodIds = selectedFoods?.map((i) => i.foodId);

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
      price: food.pricing.original - food.pricing.discounted,
    };
  });
  //calculate total amount
  const totalAmount = items.reduce((sum, i) => {
    return sum + i.price * i.quantity;
  }, 0);
  // Create a new order
  const order = new Order({
    user: userId,
    restaurant: foods[0]?.restaurant, //assuming all food came from same restaurant
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
  await order.save();
};

module.exports = {
  createOrder,
  myOrders,
  orderById,
  restaurantOrders,
  cancelOrderByUser,
  updateStatus
};
