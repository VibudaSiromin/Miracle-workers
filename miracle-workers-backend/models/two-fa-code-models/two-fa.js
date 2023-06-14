const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TwoFaSchema = new Schema({
  email: String,
  code: String,
  status: Number,
});

module.exports = mongoose.model("two-fa", TwoFaSchema);
