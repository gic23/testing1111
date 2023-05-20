const express = require("express");
const BookDepartmentController = require("../controller/BookDepartmentController");
const router = express.Router();
const auth = require("../config/auth");


router
      .route("/")
      .get(BookDepartmentController.getAll)
      .post(BookDepartmentController.insertBookDepartment)


router.route("/:id")
      .get(BookDepartmentController.getBookByDepartmentId);

router.route("/new/:id")
      .get(BookDepartmentController.getBookNotYetSelect);


router.route("/remove")
      .post(BookDepartmentController.deleteBook);




module.exports = router;
