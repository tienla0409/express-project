const User = require("../models/user.model");

module.exports = {
  authLogin: async function (req, res, next) {
    if (req.session && req.session.user) {
      return next();
    } else return res.redirect("/login");
  },
};