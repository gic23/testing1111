const Report = require("../models/report");

exports.getdatabystartdateandenddate = async (req, res, next) => {
  let {start_date,end_date} = req.body;
  try {
    const [data, _] = await Report.findByStartDateAndEndDate(start_date,end_date);
    res.status(200).json({ message:"success", data});

  } catch (error) {
    next(error);
  }
}
exports.getPaymentbystartdateandenddate = async (req, res, next) => {
  let {start_date,end_date} = req.body;
  try {
    const [data, _] = await Report.findPaymentByStartDateAndEndDate(start_date,end_date);
    console.log(data);
    res.status(200).json({ message:"success", data});
  } catch (error) {
    next(error);
  }
}


