const express = require("express");
const AuthController = require("../controller/AuthController");
const router = express.Router();


router.route("/")
  .get(AuthController.getAuthJson)
  .put(AuthController.updateAuthJson);


module.exports = router;
