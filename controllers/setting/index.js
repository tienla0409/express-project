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

  getInformation: async (req, res, next) => {
    const accessToken = req.cookies.user;

    try {
      const payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      const userMatched = await User.findById(payload.userId);

      if (!userMatched) return res.status(403).send("Not found User");

      const {
        firstName,
        lastName,
        email,
        avatar
      } = userMatched;

      res.render("information.pug", {
        title: "Information",
        user: req.cookies.user,
        firstName,
        lastName,
        email,
        avatar
      });
    } catch (err) {
      next(err);
    }
  },

  postInformation: async (req, res, next) => {
    const {
      firstName,
      lastName,
    } = req.body;

    let avatar;
    if (req.file) {
      avatar = req.file.path.split("\\").slice(1).join("/");
    } else avatar = "";

    const accessToken = req.cookies.user;

    try {
      const payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
      const userMatched = await User.findById(payload.userId);

      if (!userMatched) return res.status(403).send("Not found User");

      userMatched.firstName = firstName;
      userMatched.lastName = lastName;
      userMatched.avatar = avatar;

      await userMatched.save();

      res.redirect("/setting/information")
    } catch (err) {
      next(err);
    }
  },
};