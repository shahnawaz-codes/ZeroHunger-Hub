const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      maxlength: [30, "Name must be at most 30 characters."],
    },
    address: {
      type: String,
      required: [true, "Address is required."],
      trim: true,
    },
    cuisine: {
      type: String,
      required: [true, "Cuisine is required."],
      trim: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
