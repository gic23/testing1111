const Payments = require("../models/Payments");
const moment = require("moment");


exports.getAllPayments = async (req, res, next) => {
  try {
    const [payments, _] = await Payments.findAll();
    res.status(200).json({ count: payments.length, payments });
  } catch (error) {
    next(error);
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    let student_id = req.params.student_id;
    var curent = new Date(); 
    const create_at= moment(curent).format("YYYY-MM-DD");
    const expire_at = moment(curent).add(1, 'years').format("YYYY-MM-DD");
    const expire_status = false;

    let payment = new Payments(student_id, create_at, expire_at, expire_status);

    payment = await payment.save();
    res.status(201).json({ status: true, message: "Payment created" });


  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    let student_id = req.params.student_id;
    var curent = new Date();
    const create_at= moment(curent).format("YYYY-MM-DD");
    const expire_at = moment(curent).add(1, 'years').format("YYYY-MM-DD");
    const expire_status = false;

    let payment = new Payments(student_id, create_at, expire_at, expire_status);
    await payment.edit(student_id);

    res.status(201).json({status:true, message: "Payment modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};


exports.getPaymentByStudentId = async (req, res, next) => {
  try {
    let student_id = req.params.student_id;
    let [payment, _] = await Payments.findBystudentid(student_id);

    res.status(200).json({status:true, payment: payment[0] });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentAndStudentByStudentId = async (req, res, next) => {
  try {
    let student_id = req.params.student_id;
    let [student, _] = await Payments.findStudentAndPaymentByStudentId(student_id);

    res.status(200).json({status:true, student: student[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudentById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let student = await Candidate.DeletebyId(id);

    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    next(error);
  }
};
