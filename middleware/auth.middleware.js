const jwt = require("jsonwebtoken");

module.exports = {
  authLogin: async (req, res, next) => {
    const accessToken = req.cookies.user;
    if (!accessToken) return res.redirect("/login");

    let payload;
    try {
      payload = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      next();
    } catch (err) {
      return res.redirect("/login");
    }
  },
};