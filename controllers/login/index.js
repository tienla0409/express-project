const db = require("../../db.json");

module.exports = {
	getLogin: function(req, res, next) {
		res.render("login.pug", {title: "Login"});
		console.log(db);
	},
	postLogin: function(req, res, next) {
		const { email, password } = req.body;
		const usersDB = db.users;
		const userMatch = usersDB.find(user => {
			return user.email === email;
		});

		if(userMatch && userMatch.password === password) {
			return res.send("Logined");
		}
 
		res.send("user or password invalid");
	}
};