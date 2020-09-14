const express = require("express");

// initial router
const router = express.Router();

router.get("/", (req, res, next) => {
  req.session.destroy(err => {
    return res.status(200).redirect("/");
  });
});

module.exports = router;