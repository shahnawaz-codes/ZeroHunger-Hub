const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    resturantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resturant",
      required: [true, "Resturant is required"],
    },
    foods: [
      {
        food: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: [true, "Food is required"],
        },
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "rejected",
        "cancelled",
        "picked_up",
        "delivered",
      ],
      default: "pending",
    },
    pickupTime: {
      type: Date,
      required: [true, "Pickup time is required"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
