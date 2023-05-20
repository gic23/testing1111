const express = require("express");
const candidateController = require("../controller/candidateController");
const studentController = require("../controller/studentController");
const router = express.Router();
const auth = require("../config/auth");

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/excel');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

router
  .route("/")
  .get(candidateController.getAllstudent)
  .post(upload.single("file"), studentController.test);



module.exports = router;
