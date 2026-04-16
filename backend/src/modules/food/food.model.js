const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Food name is required"] },
    description: { type: String },
    price: { type: Number, required: [true, "Food price is required"] },
    quantity: { type: Number, required: [true, "Food quantity is required"] },
    expriryDate: { type: Date },
    image: { type: String, default: null },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["available", "sold_out", "expired"],
      default: "available",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Food", foodSchema);
