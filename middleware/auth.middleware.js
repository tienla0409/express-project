const jwt = require("jsonwebtoken");

module.exports = {
  authLogin: (req, res, next) => {
    const accessToken = req.cookies.user;
    if (!accessToken) return res.redirect("/login");

    let payload;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (err) {
      return res.redirect("/login");
    }
  },
};