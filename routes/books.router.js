const express = require("express");

// import controllers
const controllers = require("../controllers/books");
const controllersParamsId = require("../controllers/books/paramsId");

// initial router
const router = express.Router();

router.route("/")
  .get(controllers.getBooks);

router.route("/:id")
  .get(controllersParamsId.getItem)

module.exports = router;