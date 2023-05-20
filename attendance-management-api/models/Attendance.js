const db = require("../config/db");

class Attendance {

  constructor(student_id) {
    this.student_id = student_id;
  }

  save() {
    let sql = `
    INSERT INTO attendances(
      student_id
    )
    VALUES(
      '${this.student_id}'
    )`;
    return db.execute(sql);
  }
  edit(id) {
    let sql = `
      UPDATE attendances 
      set student_id='${this.student_id}'
      where students.id = '${id}';
      `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT att.*, 
    can.name, 
    can.departmentyear, 
    can.gender, 
    can.imageurl 
    FROM attendances as att LEFT JOIN candidates AS can on att.student_id = can.student_id;`;
    return db.execute(sql);
  }
  static findlastfives() {
    let sql = `SELECT att.*, can.name, can.imageurl, can.departmentyear, ct.name as candidatetype FROM 
    attendances as att 
    LEFT JOIN candidates AS can on att.student_id = can.student_id
    LEFT JOIN candidate_type as ct on can.candidatetype_id = ct.id
    order by id desc limit 5;
    `;
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM attendances WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findmostattendanceregister(number) {
    let sql = ` SELECT att.student_id, COUNT(*) AS total,  can.*
                FROM attendances as att LEFT JOIN candidates AS can on att.student_id = can.student_id
                GROUP BY att.student_id
                ORDER BY total DESC
                LIMIT ${number}; `;
    return db.execute(sql);
  }


  static countattendancetoday(todaydate) {
    let sql = `SELECT COUNT(*) AS total
               FROM attendances
               WHERE date(created) = '${todaydate}';`;
    return db.execute(sql);
  }

  static countattendancethisweek(start, end) {
    let sql = `SELECT COUNT(*) AS total
               FROM attendances
               WHERE date(created) between '${start}' and '${end}';`;
    return db.execute(sql);
  }

  static countattendancethismonth(month, year) {
    let sql = `SELECT COUNT(*) AS total
               FROM attendances
               WHERE Month(created) = '${month}' and Year(created) = '${year}';`;
    return db.execute(sql);
  }



  static countattendanceyear(year) {
    let sql = `SELECT COUNT(*) AS total
               FROM attendances
               WHERE YEAR(created) = ${year};`;
    return db.execute(sql);
  }

}

module.exports = Attendance;

