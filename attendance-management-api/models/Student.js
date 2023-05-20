const db = require("../config/db");

class Student {

  constructor(student_id,name,gender) {
    this.student_id = student_id;
    this.name = name;
    this.gender = gender;
 
  }

  save() {
    let sql = `
    INSERT INTO students (
      student_id,
      name,
      gender
    )
    VALUES(
      '${this.student_id}',
      '${this.name}',
      '${this.gender}'
    )
    
    ;` ;
    return db.execute(sql);
  }

  static CountstudentbyStudentId(id) {
    let sql = `SELECT COUNT(*) as count FROM students WHERE student_id='${id}'; `;
    return db.execute(sql);
  }

  
}

module.exports = Student;

