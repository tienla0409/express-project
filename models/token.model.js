const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  _userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    require: true,
    default: Date.now,
    expires: 43200
  },
});

const Token = mongoose.model("Token", tokenSchema, "token");

module.exports = Token;