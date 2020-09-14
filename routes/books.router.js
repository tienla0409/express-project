const express = require("express");

// import controllers
const controllers = require("../controllers/books");

// initial router
const router = express.Router();

router.get("/", controllers.getBooks);

module.exports = router;