const express = require("express");

// import controllers
const controllers = require("../controllers/reset");

// initial router
const router = express.Router();

router.route("/:token")
  .get(controllers.getReset)

module.exports = router;