const express = require("express");
const reportcontroller = require("../controller/reportController");
const router = express.Router();


router.route("/attendance").post(reportcontroller.getdatabystartdateandenddate)
router.route("/payment").post(reportcontroller.getPaymentbystartdateandenddate)


module.exports = router;
