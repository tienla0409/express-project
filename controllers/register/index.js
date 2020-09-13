const db = require("../../db.json");

module.exports = {
  getRegister: function (req, res, next) {
    res.render("register.pug");
  },

};