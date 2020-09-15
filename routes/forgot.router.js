const express = require("express");

// require controller
const controllers = require("../controllers/forgot");

// initial router
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("forgot", {
    title: "Forgot Password",
    user: req.session.user
  });
});

module.exports = router;