const db = require("../../api");

module.exports = {
  getRegister: function (req, res, next) {
    res.render("register.pug");
  },

  postRegister: function (req, res, next) {
    const {
      email,
      password,
      confirmPassword
    } = req.body; // data retrieve from form HTML

    var userDb;
    db.getData().then(users => { 
      const existEmail = users.find(user => user.email === email);
      const errors = [];

      if (!existEmail) { // email not exist => can register
        if (password === confirmPassword) { // check password match
          const userNew = {
            id: users.length + 1,
            email: email,
            password: password
          };

          db.postData(userNew);
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
    }).catch(err => console.log(err));
  },
};