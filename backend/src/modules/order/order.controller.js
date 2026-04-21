const asyncHandler = require("../../utils/asyncHandler");
const {
  createOrder,
  myOrders,
  restaurantOrders,
  orderById,
  cancelOrderByUser,
  cancelOrderByRestaurant,
  confirmOrder,
  readyOrder,
  completeOrder,
  updateStatus,
} = require("./order.service");
/**
 * post /api/orders
 * @desc Create a new order
 * @access Private (user)
 */
const handleCreateOrder = asyncHandler(async (req, res) => {
  const { items, pickupSlot } = req.body;
  const order = await createOrder(items, pickupSlot, req.user._id);
  res.status(201).json({ success: true, data: order });
});
/**
 * get /api/orders/my
 * @desc Get all orders of the logged-in user
 * @access Private (user
 */
const handleGetMyOrders = asyncHandler(async (req, res) => {
  const orders = await myOrders(req.user._id);
  res.status(200).json({ success: true, data: orders });
});
/**
 * get /api/orders/:orderId
 * @desc Get order by ID
 * @access Private (user)
 */
const handleGetOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const order = await orderById(orderId, req.user._id);
  res.status(200).json({ success: true, data: order });
});
/**
 * get /api/orders/:orderId/cancel
 * @desc cancel order by ID
 * @access Private (user)
 */
const cancelOrderByUserHandler = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  await cancelOrderByUser(orderId, req.user._id);
  res.status(200).json({ success: true, message: "order cancel successfully" });
});

///---------------------restaurant---------------------///
/**
 * get /api/restaurant/orders
 * @desc Get all orders for the logged-in restaurant
 * @access Private (Restaurant)
 */
const handleGetRestaurantOrders = asyncHandler(async (req, res) => {
  const orders = await restaurantOrders(req.restaurant?._id);
  res.status(200).json({ success: true, data: orders });
});

/**
 * patch /api/restaurant/orders/:orderId/cancel
 * @desc Update order status ->cancel
 * @access Private (Restaurant)
 */
const updateOrderStatusHandler = (status) =>
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const order = await updateStatus(orderId, req.restaurant._id, status);
    res.status(200).json({ success: true, data: order });
  });

module.exports = {
  handleCreateOrder,
  handleGetMyOrders,
  handleGetOrderById,
  handleGetRestaurantOrders,
  cancelOrderByUserHandler,
  updateOrderStatusHandler,
};
