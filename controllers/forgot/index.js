const nodemailer = require("nodemailer");
const generatorPassword = require("generate-password");

module.exports = {
  getForgot: (req, res, next) => {
    res.render("forgot", {
      title: "Forgot Password",
      user: req.cookies.user,
    });
  },

  forgotEmail: (req, res, next) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USERNAME_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    const mailOptions = {
      from: "Stone",
      to: req.body.email,
      subject: "Reset password",
      text: generatorPassword.generate({
        length: 6,
        numbers: true,
      }),
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return next(err);
      res.render("forgot", {
        message: "Check new password in email",
      });
    });
  },
};
