const express = require("express");

// require controllers
const controllers = require("../controllers/register");

// initial router
const router = express.Router();

router.route("/")
  .get(controllers.getRegister)
  .post(controllers.postRegister);

module.exports = router;