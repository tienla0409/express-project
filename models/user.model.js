const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: String,
	email: {
		type: String,
		unique: true
	},
	roles: [{
		type: String
	}],
	isVerified: {
		type: Boolean,
		default: false
	},
	password: String,
	passwordResetToken: String,
	passwordResetExpires: Date,
});

const User = mongoose.model("User", userSchema, "user");

module.exports = User;