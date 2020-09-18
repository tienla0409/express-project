// import third-party package
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// import models database
const User = require("../../models/user.model");
const Token = require("../../models/token.model");
const { token } = require("morgan");

module.exports = {
  getRegister: function (req, res, next) {
    res.render("register.pug", {
      title: "Register",
    });
  },

  postRegister: async function (req, res, next) {
    const { email, password, confirmPassword } = req.body; // data retrieve from form HTML

    const messages = [];

    const existEmail = await User.findOne({
      email: email,
    });

    if (!existEmail) {
      // email not exist => can register
      if (password === confirmPassword) {
        // check password match
        const userNew = new User({
          email: email,
          password: password,
        });

        userNew.save((err) => {
          if (err) next(err);

          const token = new Token({
            _userId: userNew._id,
            token: crypto.randomBytes(16).toString("hex"),
          });
          token.save((err) => {
            if (err) next(err);

            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.USERNAME_EMAIL,
                pass: process.env.PASSWORD_EMAIL,
              },
            });

            const mailOptions = {
              from: "stone",
              to: email,
              subject: "Account verification token",
              text:
                "Hello\n\n" +
                "Please verify your account by clicking the link:\nhttp://" +
                req.headers.host +
                "/register/confirmation/" +
                token.token,
            };

            transporter.sendMail(mailOptions, (err) => {
              if (err) next(err);
              messages.push(`A verification email has been sent to ${email}`);
            });
          });
        });
        // return res.redirect("/login");
      } else {
        // password and confirmPassword not matched
        const message = "Confirm incorrect password";
        messages.push(message);
      }
    } else {
      // email exist
      const message = "Email existed. Please choose another email";
      messages.push(message);
    }
    res.render("register.pug", {
      title: "Register",
      messages,
    });
  },

  getConfirmation: (req, res, next) => {
    try {
      const tokenMatched = Token.findOne({ token: req.params.id });

      if (!tokenMatched)
        return res
          .status(400)
          .send(
            "We were unable to find a valid tokne. Your token my have expired"
          );

      const userMatched = User.findOne({ _id: tokenMatched._userId });

      if (!userMatched)
        return res
          .status(400)
          .send("We were unable to find a user for this token.");

      userMatched.isVerified = true;
      user.save((err) => {
        if (err) return next(err);

        res.status(200).send("The account has been verified. Please log in.");
      });
    } catch (err) {
      next(err);
    }
  },
};
