const express = require("express");

// require controllers
const controllers = require("../../controllers/register");

// initial router
const router = express.Router();

router.get("/", controllers.getRegister);

module.exports = router;