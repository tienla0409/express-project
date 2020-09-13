// import models database
const User = require("../../models/user.model");

module.exports = {
  getRegister: function (req, res, next) {
    res.render("register.pug");
  },

  postRegister: async function (req, res, next) {
    const {
      email,
      password,
      confirmPassword
    } = req.body; // data retrieve from form HTML

    const errors = [];

    const existEmail = await User.findOne({ email: email});
    if (!existEmail) { // email not exist => can register
      if (password === confirmPassword) { // check password match
        const userNew = new User({
          email: email,
          password: password
        });

        userNew.save(err => {
          if(err) return err;
          else console.log(`Save user successfully`);
        });
        return res.redirect("/login");
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