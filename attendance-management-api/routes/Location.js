const express = require("express");
const locationController = require("../controller/LocationController");
const router = express.Router();

router
  .route("/")
  .get(locationController.getAll)
  .post(locationController.createNew);

router.route("/:id")
  .get(locationController.getById)
  .delete(locationController.getletById)
  .put(locationController.Update);

router.route("/find/:name")
  .get(locationController.getByNameIgnorcase);
module.exports = router;
