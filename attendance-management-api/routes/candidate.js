const express = require("express");
const candidateController = require("../controller/candidateController");
const router = express.Router();
const auth = require("../config/auth");

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

//multer for excel

var storageexcel = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/excel');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const uploadexcel = multer({
  storage: storageexcel,
  limits: { fileSize: 1000000 }
});

router
  .route("/")
  .get(candidateController.getAllstudent)
  .post(upload.single("image"), candidateController.createNewStudent);
router.route("/upload").post(uploadexcel.single("file"), candidateController.uploadexceldata);
router.route("/:id")
  .get(candidateController.getStudentById)
  .delete(candidateController.deleteStudentById)
  .put(upload.single("image"), candidateController.updateStudent);
router.route("/studentid/:id").get(candidateController.getStudentByStudentId)

module.exports = router;
