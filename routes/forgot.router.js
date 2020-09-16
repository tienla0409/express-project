const express = require("express");

// require controller
const controllers = require("../controllers/forgot");

// initial router
const router = express.Router();

router.route("/")
  .get(controllers.getForgot)
  .post(controllers.forgotEmail);

module.exports = router;