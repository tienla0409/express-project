const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	sessionID: String,
});

const User = mongoose.model("User", userSchema, "user");

module.exports = User;