const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Place = new Schema({
  isVisited: { type: Boolean, default: false },
  name: { type: String, required: true },
  category: { type: String, min: 5, required: true },
  description: { type: String, required: true },
  cuisine: { type: String, required: false },
  price: { type: Number, required: false },
  location: { type: String, required: true },
  lastUpdatedWhen: {
    type: Date,
  },
});

module.exports = mongoose.model("place", Place);
