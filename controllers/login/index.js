// import third-party package
const bcrypt = require("bcrypt");

// import models database
const User = require("../../models/user.model");

module.exports = {
	getLogin: function (req, res, next) {
		// console.log(req.session)
		res.render("login.pug", {
			title: "Login"
		});
	},
	postLogin: async function (req, res, next) {
		const {
			email,
			password
		} = req.body;
		const userMatch = await User.findOne({
			email: email
		});

		if (userMatch) {
			const result = await bcrypt.compare(password, userMatch.password);
			if (result) { // password matched
				return res.send("Logined");
			};
		};

		res.send("user or password invalid");
	}
};