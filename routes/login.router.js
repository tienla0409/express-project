const express = require("express");

// require controller
const controllers = require("../controllers/login");

// initial router
const router = express.Router();

router.get("/", controllers.getLogin);

router.post("/", controllers.postLogin)

module.exports = router;