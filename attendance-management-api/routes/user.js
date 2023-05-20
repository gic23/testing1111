const express = require('express')
const userController = require("../controller/userController");
const router = express.Router();
const auth = require("../config/auth");

router.route("/").get(auth, userController.getAlluser)
router.route("/register").post(userController.regitster);
router.route("/changepassword").put(userController.changepassword);
router.route("/:id")
  .put(userController.update_user)
  .delete(userController.deletUserById);
router.route("/login").post(userController.login);

module.exports = router;

