const Food = require("../food/food.model");
const Order = require("./order.model");

const create = async (payload, userId) => {
  const food = await Food.findById(payload.foodId);
  if (!food) {
    throw new AppError("Food not found", 404);
  }
  // Create a new order
  const order = new Order({
    userId,
    resturantId: food.restaurant,
    // Assuming the order contains only one food item for simplicity
    foods: [
      {
        food: food._id,
        quantity: payload.quantity,
      },
    ],
    pickupTime: payload.pickupTime,
    totalAmount: payload.totalAmount,
  });
  return await order.save();
};

const myOrders = async (userId) => {
  return await Order.find({ userId }).populate("foods.food name image price");
};

const orderById = async (id, userId) => {
  const order = await Order.findOne({ _id: id, userId }).populate(
    "foods.food name image price",
  );
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  if (order.userId.toString() !== userId) {
    throw new AppError("Unauthorized access", 403);
  }
  return order;
};
const resturantOrders = async (resturantId) => {
  const orders = await Order.find({ resturantId }).populate(
    "foods.food name image price",
  );
  if (!orders) {
    throw new AppError("No orders found for this restaurant", 404);
  }

  return orders;
};

module.exports = { create, myOrders, orderById, resturantOrders };
