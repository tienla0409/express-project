// import third-party package
const bcrypt = require("bcrypt");

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

		if (!userMatch) {
			errors.push("Email not exist");
		};

		const result = await bcrypt.compare(password, userMatch.password);

		if (!result) {
			errors.push("Password invalid");
			return res.render("login", {
				errors
			});
		};

		// password matched
		var sessionData = req.session;
		sessionData.user = userMatch.sessionID;
		req.cookie = sessionData
		return res.redirect("/books");
	}
};