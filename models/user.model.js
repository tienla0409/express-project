const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		default: ""
	},
	lastName: {
		type: String,
		default: "",
	},
	email: {
		type: String,
		unique: true
	},
	avatar: String,
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
		if (!this.isModified("password")) return next();

		console.log("Password", this.password);
		const salt = await bcrypt.genSalt(10);

		const passwordHashed = await bcrypt.hash(this.password, salt);
		console.log("Password hashed", passwordHashed);
		this.password = passwordHashed;
		next();
	} catch (err) {
		next(err);
	}
});

userSchema.methods.isValidPassword = function (passwordInput) {
	return bcrypt.compare(passwordInput, this.password);
};

const User = mongoose.model("User", userSchema, "user");

module.exports = User;