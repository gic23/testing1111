const db = require("../config/db");

class Payments {

  constructor(student_id, create_at, expire_at, expire_status) {
    this.student_id = student_id;
    this.create_at = create_at;
    this.expire_at = expire_at;
    this.expire_status = expire_status;
  }


  save() {
    let sql = `
    INSERT INTO payments(
      student_id,
      create_at,
      expire_at,
      expire_status
    )
    VALUES(
      '${this.student_id}',
      '${this.create_at}',
      '${this.expire_at}',
      '${this.expire_status}'
    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = `
      UPDATE payments 
        set 
        create_at='${this.create_at}',
        expire_at='${this.expire_at}',
        expire_status='${this.expire_status}'
        where student_id='${this.student_id}';
      `;
    return db.execute(sql);
  }

  static DeletebyId(id) {
    let sql = `Delete FROM payments where id=${id};`;
    return db.execute(sql);
  }

  static findBystudentid(student_id) {
    let sql = `Select * from payments where student_id = '${student_id}'`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * from payments `;
    return db.execute(sql);
  }

  static findStudentAndPaymentByStudentId(student_id) {
    let sql = `SELECT can.* , pay.expire_status
              FROM candidates as can LEFT JOIN payments AS pay ON can.student_id = pay.student_id
              WHERE can.student_id='${student_id}';`;
    return db.execute(sql);
  }

}

module.exports = Payments;

