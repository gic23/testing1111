const db = require("../config/db");
const moment = require("moment");

class Report {



  static count_year_dapartment_today() {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT stu.year_department as category, COUNT(year_department) AS count
                FROM attendances AS att
                JOIN candidates AS stu ON stu.student_id = att.student_id
                WHERE date(att.created) = '${convertTime}'
                GROUP BY stu.year_department;`;
    return db.execute(sql);

  }

  static findByStartDateAndEndDate(startDate, endDate) {
    let sql = `SELECT stu.student_id, stu.name, stu.gender, stu.imageurl, stu.phone_number, stu.departmentyear, att.created
    FROM attendances as att JOIN candidates AS stu on att.student_id = stu.student_id
    where date(att.created) >= '${startDate}' AND date(att.created) <= '${endDate}' ;`;
    return db.execute(sql);
  }


  static findPaymentByStartDateAndEndDate(startDate, endDate) {
    let sql = `SELECT stu.student_id, stu.name, stu.gender, stu.imageurl, stu.phone_number, stu.departmentyear, pay.create_at as payment_at
    FROM payments as pay JOIN candidates AS stu on pay.student_id = stu.student_id
    where date(pay.create_at) >= '${startDate}' AND date(pay.create_at) <= '${endDate}' ;`;
    return db.execute(sql);
  }



}

module.exports = Report;

