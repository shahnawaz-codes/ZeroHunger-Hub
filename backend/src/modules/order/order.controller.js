const asyncHandler = require("../../utils/asyncHandler");

/**
 * post /api/orders
 * @desc Create a new order
 * @access Private
 */
const handleCreateOrder = asyncHandler(async (req, res) => {
  // Extracting necessary fields from the request body
  const { foodId, quantity, pickupTime, totalAmount } = req.body;
  const payload = {
    foodId,
    quantity,
    pickupTime,
    totalAmount,
  };
  const order = await create(payload, req.user.id);
  res.status(201).json({ success: true, data: order });
});
/**
 * get /api/orders/my
 * @desc Get all orders of the logged-in user
 * @access Private
 */
const handleGetMyOrders = asyncHandler(async (req, res) => {
  const orders = await myOrders(req.user.id);
  res.status(200).json({ success: true, data: orders });
});

/**
 * get /api/orders/:id
 * @desc Get order by ID
 * @access Private
 */
const handleGetOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await orderById(id, req.user.id);
  res.status(200).json({ success: true, data: order });
});
/**
 * get /api/orders/restaurant
 * @desc Get all orders for the logged-in restaurant
 * @access Private (Restaurant)
 */
const handleGetResturantOrders = asyncHandler(async (req, res) => {
  const orders = await resturantOrders(req.user.id);
  res.status(200).json({ success: true, data: orders });
});

/**
 * patch /api/orders/:id/status
 * @desc Update order status
 * @access Private (Restaurant)
 */
const handleUpdateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await updateOrderStatus(id, status);
  res.status(200).json({ success: true, data: order });
});

module.exports = {
  handleCreateOrder,
  handleGetMyOrders,
  handleGetOrderById,
  handleGetResturantOrders,
  handleUpdateOrderStatus,
};
