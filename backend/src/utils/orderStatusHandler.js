const AppError = require("./AppError");

/**
 * Defines valid order status transitions.
 * Ensures orders follow a proper workflow and prevents invalid state changes.
 *
 * Valid State Transitions:
 * - pending → cancelled | confirmed
 * - confirmed → cancelled | ready_for_pickup
 * - ready_for_pickup → completed
 *
 * @type {Object}
 *
 * @description
 * Order Lifecycle:
 * 1. pending: Initial state after customer books Bag
 *    - Can move to: cancelled (customer) or confirmed (restaurant)
 *
 * 2. confirmed: Restaurant has accepted and is preparing order
 *    - Can move to: cancelled or ready_for_pickup
 *
 * 3. ready_for_pickup: Order is ready and waiting for customer pickup
 *    - Can move to: completed only
 *
 * 4. completed: Customer has picked up the order (terminal state)
 *
 * Note: cancelled is a terminal state and has no transitions defined
 */
const validTransitions = {
  pending: ["cancelled", "confirmed"], // while pending user can cancel or restaurant can confirm
  confirmed: ["cancelled", "ready_for_pickup"],
  ready_for_pickup: ["completed"],
};

/**
 * Updates order status with validation of state transitions.
 * Throws AppError if status change is invalid.
 *
 * @function updateOrderStatus
 * @param {Object} order - Order document from MongoDB (must have status property)
 * @param {string} order.status - Current order status
 * @param {string} newStatus - Desired new status
 *
 * @returns {void} Modifies order.status directly
 *
 * @throws {AppError} 400 - If status is unchanged (idempotent check)
 * @throws {AppError} 400 - If transition is not allowed
 *
 * @description
 * - Validates that newStatus is in allowed transitions for current status
 * - Throws error if transition is invalid
 * - Updates order.status property directly (caller must save to DB)
 * - Prevents invalid state transitions to maintain order integrity
 * - Used before order.save() in controllers
 *
 * State Validation:
 * 1. Check if newStatus === currentStatus (no change needed)\n * 2. Check if newStatus is in validTransitions[currentStatus]\n * 3. Update order.status if valid\n * 4. Throw AppError if invalid\n * \n * @example\n * // In order controller\n * const updateOrderHandler = asyncHandler(async (req, res) => {\n *   const order = await Order.findById(req.params.id);\n *   if (!order) throw new AppError('Order not found', 404);\n *   \n *   // Validate and update status\n *   updateOrderStatus(order, req.body.status); // Throws if invalid\n *   \n *   // If we reach here, status change is valid\n *   await order.save();\n *   res.json({ success: true, data: order });\n * });\n */
const updateOrderStatus = (order, newStatus) => {
  const allowed = validTransitions[order.status];

  if (order.status === newStatus) {
    throw new AppError(`Order already has status ${newStatus}`, 400);
  }

  if (!allowed || !allowed.includes(newStatus)) {
    throw new AppError(
      `Cannot change status from ${order.status} to ${newStatus}`,
      400,
    );
  }

  order.status = newStatus;
};
module.exports = updateOrderStatus;
