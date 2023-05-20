const db = require("../config/db");

class CandidateExcel {



  constructor(student_id, name, namekh, gender, dateofbirth,  department_id, departmentoption_id,study_year) {
    this.student_id = student_id;
    this.name = name;
    this.namekh = namekh;
    this.gender = gender;
    this.dateofbirth = dateofbirth;
    this.department_id = department_id;
    this.departmentoption_id = departmentoption_id;
    this.study_year = study_year;
  }

  save() {
    let sql = `
    INSERT INTO candidates(
      student_id,
      name,
      namekh,
      gender,
      dateofbirth,
      department_id,
      departmentoption_id,
      study_year
    )
    VALUES(
      '${this.student_id}',
      '${this.name}',
      '${this.namekh}',
      '${this.gender}',
      '${this.dateofbirth}',
      '${this.department_id}',
      '${this.departmentoption_id}',
      '${this.study_year}'
    )`;
    return db.execute(sql);
  }


}

module.exports = CandidateExcel;

