const db = require("../config/db");

class Candidate {

  constructor(student_id, name, namekh, gender, phone_number, dateofbirth, candidatetype_id, department_id, departmentoption_id, departmentyear, study_year, imageurl) {
    this.student_id = student_id;
    this.name = name;
    this.namekh = namekh;
    this.gender = gender;
    this.phone_number = phone_number;
    this.dateofbirth = dateofbirth;
    this.candidatetype_id = candidatetype_id;
    this.department_id = department_id;
    this.departmentoption_id = departmentoption_id;
    this.study_year = study_year;
    this.departmentyear = departmentyear;
    this.imageurl = imageurl;
  }


  save() {
    let sql = `
    INSERT INTO candidates(
      student_id,
      name,
      namekh,
      gender,
      phone_number,
      dateofbirth,
      candidatetype_id,
      department_id,
      departmentoption_id,
      study_year,
      departmentyear,
      imageurl,
      register_status
    )
    VALUES(
      '${this.student_id}',
      '${this.name}',
      '${this.namekh}',
      '${this.gender}',
      '${this.phone_number}',
      '${this.dateofbirth}',
      '${this.candidatetype_id}',
      '${this.department_id}',
      '${this.departmentoption_id}',
      '${this.study_year}',
      '${this.departmentyear}',
      '${this.imageurl}',
      1
    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = "";
    if (this.imageurl != '') {
      sql = `
      UPDATE candidates 
      set student_id='${this.student_id}',
          name='${this.name}',
          namekh='${this.namekh}',
          gender='${this.gender}',
          phone_number='${this.phone_number}',
          dateofbirth='${this.dateofbirth}',
          candidatetype_id='${this.candidatetype_id}',
          department_id='${this.department_id}',
          departmentoption_id='${this.departmentoption_id}',
          study_year='${this.study_year}',
          departmentyear='${this.departmentyear}',
          imageurl='${this.imageurl}',
          register_status=1
          where candidates.id = '${id}' ;
      `;
    } else {
      sql = `
      UPDATE candidates 
      set student_id='${this.student_id}',
          name='${this.name}',
          namekh='${this.namekh}',
          gender='${this.gender}',
          phone_number='${this.phone_number}',
          dateofbirth='${this.dateofbirth}',
          candidatetype_id='${this.candidatetype_id}',
          department_id='${this.department_id}',
          departmentoption_id='${this.departmentoption_id}',
          study_year='${this.study_year}',
          departmentyear='${this.departmentyear}',
          register_status=1
          where candidates.id = '${id}'
      `;
    }
    return db.execute(sql);
  }

  static DeletebyId(id) {
    let sql = `Delete FROM candidates where id=${id};`;
    return db.execute(sql);
  }


  static findBystudentid() {
    let sql = `SELECT can.*, de.name as deparment, ct.name as candidatetype, deo.name as departmentoption 
    FROM candidates AS can
    LEFT JOIN candidate_type AS ct ON can.candidatetype_id=ct.id
    LEFT JOIN departments AS de ON can.department_id = de.id
    LEFT JOIN department_options AS deo ON can.departmentoption_id = deo.id 
    WHERE student_id='${id}'; `;
    return db.execute(sql);
  }

  static CountstudentbyStudentId(id) {
    let sql = `SELECT COUNT(*) as count FROM candidates WHERE student_id='${id}'; `;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT can.*, de.name as deparment, ct.name as candidatetype, deo.name as departmentoption,  IFNULL(pay.expire_status,True) as expire_status
    FROM candidates AS can
    LEFT JOIN candidate_type AS ct ON can.candidatetype_id=ct.id
    LEFT JOIN departments AS de ON can.department_id = de.id
    LEFT JOIN department_options AS deo ON can.departmentoption_id = deo.id
    LEFT JOIN payments as pay on pay.student_id = can.student_id; `;
    return db.execute(sql);
  }

  static findById(id) {
    let sql = ` SELECT can.*, de.name as deparment, ct.name as candidatetype, deo.name as departmentoption 
    FROM candidates AS can
    LEFT JOIN candidate_type AS ct ON can.candidatetype_id=ct.id
    LEFT JOIN departments AS de ON can.department_id = de.id
    LEFT JOIN department_options AS deo ON can.departmentoption_id = deo.id  
    WHERE can.id = ${id};`;
    return db.execute(sql);
  }

  static findStudentByStudentId(id) {
    let sql = ` SELECT can.*, pay.create_at as create_at, pay.expire_at as expire_at, de.name as deparment, ct.name as candidatetype, deo.name as departmentoption 
    FROM candidates AS can
    LEFT JOIN candidate_type AS ct ON can.candidatetype_id=ct.id
    LEFT JOIN departments AS de ON can.department_id = de.id
    LEFT JOIN department_options AS deo ON can.departmentoption_id = deo.id 
    LEFT JOIN payments as pay ON can.student_id = pay.student_id
    WHERE can.student_id = '${id}'; `;
    return db.execute(sql);
  }

}

module.exports = Candidate;

