const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  name: String,
  address: String,
  cuisine: String,

  isApproved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
