const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },

    name: {
      type: String,
      required: [true, "Name is required."],
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    category: {
      type: String,
      default: "other",
    },

    pricing: {
      original: Number,
      discounted: {
        type: Number,
        default: 0,
        validate: {
          validator: function (val) {
            return val < this.original;
          },
          message: "Discount cannot exceed original price",
        },
      },
    },

    quantity: {
      total: { type: Number, required: [true, "Total quantity is required."] },
      left: {
        type: Number,
        // doing this we can make sure that the left quantity is always less than or equal to the total quantity (left<=total)
        default: function () {
          return this.total;
        }, // default value as total
      },
    },

    pickupSlots: [
      {
        start: Date,
        end: Date,
      },
    ],

    expiryTime: Date,

    tags: [String],

    image: String,

    status: {
      type: String,
      enum: ["active", "sold_out", "expired"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Food", foodSchema);
