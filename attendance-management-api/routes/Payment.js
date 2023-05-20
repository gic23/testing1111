const express = require("express");
const paymentController = require("../controller/PaymentController");
const router = express.Router();

router.route("/")
      .get(paymentController.getAllPayments)
      .get(paymentController.getPaymentByStudentId)
      .post(paymentController.createPayment);

router.route("/:student_id")
      .get(paymentController.getPaymentByStudentId)
      .post(paymentController.createPayment)
      .put(paymentController.updatePayment);

router.route("/student/:student_id")
      .get(paymentController.getPaymentAndStudentByStudentId)


module.exports = router;
