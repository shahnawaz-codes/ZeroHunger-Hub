const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema(
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
    },
    category: {
      type: String,
      default: "other",
    },
    pricing: {
      original: {
        type: Number,
        required: [true, "Original price is required."],
        min: 0,
      },
      // discounted price can be zero (free) but not negative, and should be less than or equal to original price
      discounted: {
        type: Number,
        default: 0,
        min: 0,
        validate: {
          validator: function (val) {
            const original = this.pricing?.original;
            if (original == undefined || original == null) {
              return true; // if original price is not set, skip this validation (other validation will catch missing original price)
            }
            return val <= original; // can be less than or equal
          },
          message: "Discounted price cannot exceed original price",
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

    pickupWindow: {
      start: Date,
      end: Date,
    },

    expiryTime: Date,

    tags: [String],

    image: String,

    status: {
      type: String,
      enum: ["active", "paused", "sold_out", "expired"],
      default: "active",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Bag", bagSchema);
