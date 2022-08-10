const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Place = new Schema({
  isVisited: { type: Boolean, default: false },
  name: { type: String, required: true },
  category: { type: String, min: 5, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
});

module.exports = mongoose.model("place", Place);
