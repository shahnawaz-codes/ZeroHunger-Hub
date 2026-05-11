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
    item: {
      type: {
        bag: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bag",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          max: 2,
        },
        name: {
          type: String,
          required: true,
        }, // snapshot
        price: {
          type: Number,
          required: true,
        }, // snapshot
      },
      validate: {
        validator: function (val) {
          return (
            val.bag && val.name && val.price != null && val.quantity != null
          );
        },
        message: "item must have bag, name, price, and quantity",
      },
    },
    orderCode: String, // "ZH-4821" shown at pickup
    totalAmount: Number,
    pickupWindow: {
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
    rating: { type: Number, min: 1, max: 5 }, // post-pickup
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
