const db = require("../../db.json");

module.exports = {
  getRegister: function (req, res, next) {
    res.render("register.pug");
  },
  postRegister: function (req, res, next) {
    const {
      email,
      password,
      confirmPassword
    } = req.body;
    const existEmail = db.users.find(user => user.email === email);

    const errors = [];

    if (!existEmail) { // email not exist => can register
      if (password === confirmPassword) {
        const userNew = {
          email: email,
          password: password
        };
        db.users.push(userNew);
        res.redirect("/login");
      } else { // password and confirmPassword not matched
        const message = "Confirm incorrect password";
        errors.push(message);
      }
    } else { // email exist
      const message = "Email existed. Please choose another email";
      errors.push(message);
    }
    res.render("register.pug", {
      title: "Register",
      errors: errors,
    });
  },
};