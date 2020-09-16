const express = require("express");

// import controllers
const controllers = require("../controllers/logout");

// initial router
const router = express.Router();

router.route("/")
  .get(controllers.logoutEmail);

module.exports = router;