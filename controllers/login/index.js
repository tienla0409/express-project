module.exports = {
	getLogin: function(req, res, next) {
		res.render("login.pug", {title: "Login"});
	},
};