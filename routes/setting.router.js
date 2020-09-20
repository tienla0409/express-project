const express = require("express");

const multer = require("multer");

const upload = multer({
  dest: "public/images"
});

// import controllers 
const controllers = require("../controllers/setting");

// initial router
const router = express.Router();

router.route("/change_password")
  .get(controllers.getChangePassword)
  .post(controllers.postChangePassword)

router.route("/information")
  .get(controllers.getInformation)
  .post(upload.single("avatar"), controllers.postInformation)

module.exports = router;