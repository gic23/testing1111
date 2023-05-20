const express = require("express");
const departmentController = require("../controller/DepartmentController");
const router = express.Router();
const auth = require("../config/auth");


router
  .route("/")
  .get(departmentController.getAllDepartment)
  .post(departmentController.createNewDepartment);

router.route("/:id")
  .get(departmentController.getDepartmentById)
  .delete(departmentController.deleteDepartmentById)
  .put(departmentController.updateDepartment);

router.route("/find/:name")
  .get(departmentController.getByNameIgnorcase);

module.exports = router;
