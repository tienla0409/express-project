const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function (next) {
	try {
		const salt = await bcrypt.genSalt(10);

		const passwordHashed = await bcrypt.hash(this.password, salt);

		this.password = passwordHashed;
		next();
	} catch (err) {
		next(err);
	}
});

userSchema.methods.isValidPassword = async function (passwordInput) {
	return await bcrypt.compare(passwordInput, this.password);
};

const User = mongoose.model("User", userSchema, "user");

module.exports = User;