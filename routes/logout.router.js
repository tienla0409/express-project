const express = require("express");

// import controllers
const controllers = require("../controllers/logout");

// initial router
const router = express.Router();

router.get("/", controllers.logoutEmail);

module.exports = router;