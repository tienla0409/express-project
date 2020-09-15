module.exports = {
  logoutEmail: (req, res, next) => {
    if (req.cookies.user) {
      res.clearCookie("user");
      return res.redirect("/");
    }
  },
};