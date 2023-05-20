const db = require("../config/db");
const moment = require("moment");

class Chart {



  static count_year_dapartment_today() {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT can.departmentyear as category, COUNT(study_year) AS count
                FROM attendances AS att
                JOIN candidates AS can ON can.student_id = att.student_id
                WHERE date(att.created) = '${convertTime}'
                GROUP BY can.departmentyear;`;
    return db.execute(sql);

  }


  static count_attendance_startdate_enddate_by_departmentyear(startDate, endDate) {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT can.departmentyear as category, COUNT(*) AS count
    FROM attendances as att JOIN candidates AS can on att.student_id = can.student_id
    where date(att.created) >= '${startDate}' AND date(att.created) <= '${endDate}'
	 GROUP BY can.departmentyear;`;
    return db.execute(sql);
  }

  static count_attendance_startdate_enddate_by_daily(startDate, endDate) {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT date(att.created) as category, COUNT(*) AS count
    FROM attendances as att JOIN candidates AS can on att.student_id = can.student_id
    where date(att.created) >= '${startDate}' AND date(att.created) <= '${endDate}'GROUP BY date(att.created);`;
    return db.execute(sql);

  }

  static count_attendance_startdate_enddate_by_month(startDate, endDate) {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT date(att.created) as category, COUNT(*) AS count
    FROM attendances as att JOIN candidates AS stu on att.student_id = stu.student_id
    where date(att.created) >= '${startDate}' AND date(att.created) <= '${endDate}'
	 GROUP BY month(att.created), YEAR(att.created) ;`;
    return db.execute(sql);

  }


  static count_book_by_department() {
    let sql = `SELECT d.name as category, 
    COUNT(*) AS count
    FROM departments AS d 
    JOIN book_department AS bd ON d.id = bd.id_department
	  GROUP BY d.name;`;
    return db.execute(sql);
  }


}

module.exports = Chart;

