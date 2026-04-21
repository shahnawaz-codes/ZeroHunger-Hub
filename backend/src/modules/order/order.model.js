const mongoose = require("mongoose");
const { validate } = require("../Restaurant/restaurant.model");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    items: {
      type: [
        {
          food: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food",
            required: true,
          },
          name: {
            type: String,
            required: true,
          }, // snapshot
          price: {
            type: Number,
            required: true,
          }, // snapshot
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "Order must contain at least one item",
      },
    },

    totalAmount: Number,

    pickupSlot: {
      start: Date,
      end: Date,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "ready_for_pickup",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
