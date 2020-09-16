// import third-party package
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// import models database
const User = require("../../models/user.model");

module.exports = {
	getLogin: function (req, res, next) {
		res.render("login.pug", {
			title: "Login",
		});
	},

	postLogin: async function (req, res, next) {
		const {
			email,
			password
		} = req.body;
		const errors = [];

		const userMatch = await User.findOne({
			email: email
		});

		if (!userMatch) errors.push("Email not exist");

		if (userMatch && !userMatch.isVerified) errors.push("Email is not verify");

		if (userMatch && userMatch.isVerified) {
			const result = await bcrypt.compare(password, userMatch.password);

			if (!result) {
				errors.push("Password invalid");
				return res.render("login", {
					errors
				});
			};

			// password matched
			const payload = {
				user: userMatch._id,
			};

			const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
				algorithm: "HS256",
				expiresIn: process.env.ACCESS_TOKEN_LIFE,
			});


			// const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
			// 	algorithm: "HS256",
			// 	expiresIn: process.env.REFRESH_TOKEN_LIFE
			// })

			// userMatch[email].refreshToken = refreshToken;

			// send the access token to the client inside a cookie
			res.cookie("user", accessToken, {
				httpOnly: true
			});

			return res.redirect("/books");
		}
		res.render("login.pug", {
			title: "Login",
			errors
		})
	}
};