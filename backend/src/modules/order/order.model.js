const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },

  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
      name: String, // snapshot
      price: Number, // snapshot
      quantity: Number,
    }
  ],

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

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
