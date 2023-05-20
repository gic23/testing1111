const express = require("express");
const Bookcontroller = require("../controller/Bookcontroller");
const router = express.Router();



router
  .route("/")
  .get(Bookcontroller.getBooks)
  .post(Bookcontroller.createNewBook);

router.route("/:id")
      .get(Bookcontroller.getBookById)
      .delete(Bookcontroller.deleteBookById)
      .put(Bookcontroller.updateBook);

router.route("/find/:search")
      .get(Bookcontroller.findBookByItemCode)

module.exports = router;
