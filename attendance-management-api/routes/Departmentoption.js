const express = require("express");
const departmentoptionController = require("../controller/DepartmentOptionController");
const router = express.Router();
const auth = require("../config/auth");


router
  .route("/")
  .get(departmentoptionController.getAllDepartmentOption)
  .post(departmentoptionController.createNewDepartmentOption);

router.route("/:id")
  .get(departmentoptionController.getDepartmentOptionById)
  .delete(departmentoptionController.deleteDepartmentOptionById)
  .put(departmentoptionController.updateDepartmentOption);

router.route("/find/:name")
  .get(departmentoptionController.getByNameIgnorcase);

module.exports = router;
