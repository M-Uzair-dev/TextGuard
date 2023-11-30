const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

schema.pre("save", async function (next) {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", schema);
