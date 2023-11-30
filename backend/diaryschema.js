const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  heading: { type: String, required: true },
  message: { type: String, required: true },
  highlighted: { type: Boolean, default: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("messages", schema);
