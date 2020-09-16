// import third-party package
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// import models database
const User = require("../../models/user.model");
const Token = require("../../models/token.model");

module.exports = {
  getRegister: function (req, res, next) {
    res.render("register.pug", {
      title: "Register"
    });
  },

  postRegister: async function (req, res, next) {
    const {
      email,
      password,
      confirmPassword
    } = req.body; // data retrieve from form HTML

    const errors = [];

    const existEmail = await User.findOne({
      email: email
    });

    if (!existEmail) { // email not exist => can register
      if (password === confirmPassword) { // check password match
        bcrypt.hash(password, 10, (err, hashPassword) => {
          const userNew = new User({
            email: email,
            password: hashPassword,
          });

          userNew.save(errs => {
            if (err) return res.status(500).send(err.message);

            const token = new Token({
              _userId: userNew._id,
              token: crypto.randomBytes(16).toString("hex"),
            })
            token.save(err => {
              if (err) return res.status(500).send(err.message);

              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.USERNAME_EMAIL,
                  pass: process.env.PASSWORD_EMAIL
                },
              });

              const mailOptions = {
                from: "stone",
                to: email,
                subject: "Account verification token",
                text: "Hello\n\n" + "Please verify your account by clicking the link:\nhttp:\/\/" + req.headers.host + "\/confirmation\/" + token.token,
              };

              transporter.sendMail(mailOptions, err => {
                if (err) return res.status(500).send(err.message);
                res.status(200).send("A verification email has been sent to " + email);
              });
            });
          });
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