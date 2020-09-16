const express = require("express");

// require controller
const controllers = require("../controllers/login");

// initial router
const router = express.Router();

router.route("/")
  .get(controllers.getLogin)
  .post(controllers.postLogin)

module.exports = router;