const User = require("../../models/user.model");

module.exports = {
	getLogin: function(req, res, next) {
		res.render("login.pug", {title: "Login"});
	},
	postLogin: async function(req, res, next) {
		const { email, password } = req.body;
		const userMatch = await User.findOne({ email: email, password: password });

		if(userMatch) {
			return res.send("Logined");
		}
 
		res.send("user or password invalid");
	}
};