const AppError = require("./AppError");

const validTransitions = {
  pending: ["cancelled", "confirmed"], // while pending user can cancel or restaurant can confirm
  confirmed: ["cancelled", "ready_for_pickup"],
  ready_for_pickup: ["completed"],
};
const updateOrderStatus = (order, newStatus) => {
  const allowed = validTransitions[order.status];

  if (order.status === newStatus) {
    throw new AppError(`order already has ${newStatus}`);
  }

  if (!allowed || !allowed.includes(newStatus)) {
    throw new AppError(
      `Cannot change status from ${order.status} to ${newStatus}`,
    );
  }

  order.status = newStatus;
};
module.exports = updateOrderStatus;
