const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      maxlength: [30, "Name must be at most 30 characters."],
    },
    location: {
      type: { type: String, default: "Point", enum: ["Point"] },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: [true, "Coordinates are required."],
      },
    },
    address: {
      street: String,
      city: String,
      pincode: String,
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

restaurantSchema.index({ location: "2dsphere" }); // for geospatial queries (like finding nearby restaurants)

module.exports = mongoose.model("Restaurant", restaurantSchema);
