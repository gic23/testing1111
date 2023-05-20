const express = require("express");
const candidatetypeController = require("../controller/candidatetypeController");
const router = express.Router();
const auth = require("../config/auth");


router
  .route("/")
  .get(candidatetypeController.getAllCandidateType)
  .post(candidatetypeController.createNewCandidateType);

router.route("/:id")
  .get(candidatetypeController.getCandidateTypeById)
  .delete(candidatetypeController.deleteCandidateTypeById)
  .put(candidatetypeController.updateCandidateType);

module.exports = router;
