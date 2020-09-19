const nodemailer = require("nodemailer");
const crypto = require("crypto");
const generator = require("generate-password");

const User = require("../../models/user.model");

module.exports = {
  getForgot: (req, res, next) => {
    res.render("forgot", {
      title: "Forgot Password",
      user: req.cookies.user,
    });
  },

  forgotEmail: async (req, res, next) => {
    const email = req.body.email;
    const newPassword = generator.generate({
      length: 6,
      numbers: true,
    });

    try {

      const userMatched = await User.findOne({
        email
      });

      if (!userMatched) return next(err);

      const token = await crypto.randomBytes(16).toString("hex");

      userMatched.passwordResetToken = token;
      userMatched.passwordResetExpires = Date.now() + 3600000;

      await userMatched.save();

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
        subject: "New password",
        text: `
        Hello, new password your account: ${newPassword}.\n\n
        Please active new password your account by clicking the link: 
        http://${req.headers.host}/reset/${token}?new_password=${newPassword}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) return next(err);

        return res.render("forgot", {
          title: "Forgot Password",
          message: "Check new password in email",
        });
      });
    } catch (err) {
      next(err);
    }
  },
};