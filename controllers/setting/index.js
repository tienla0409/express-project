const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

module.exports = {
  getChangePassword: (req, res, next) => {
    res.render("change_password", {
      title: "Change Password",
      user: req.cookies.user,
    });
  },

  postChangePassword: async (req, res, next) => {
    const accessToken = req.cookies.user;
    const {
      currentPassword,
      newPassword,
      retypeNewPassword,
    } = req.body;
    const errors = [];

    try {
      const payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

      const userMatched = await User.findById(payload.userId);

      if (!userMatched) return res.redirect("/login");

      const passwordMatched = await userMatched.isValidPassword(currentPassword);

      if (!passwordMatched) errors.push("Current password invalid");

      if (newPassword !== retypeNewPassword) errors.push("Passwords do not match");

      if (passwordMatched && newPassword === retypeNewPassword) {
        userMatched.password = newPassword;
        await userMatched.save();
        return res.redirect("/logout");
      }
    } catch (err) {
      return next(err);
    }

    res.render("change_password.pug", {
      title: "Change Password",
      errors
    });
  },

  getInformation: (req, res, next) => {
    res.render("information.pug", {
      title: "Information",
    })
  },
};