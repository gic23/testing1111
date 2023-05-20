const db = require("../config/db");

class Department {

  constructor(name) {
    this.name = name;
  }

  save() {
    let sql = `
    INSERT INTO departments(
      name
    )
    VALUES(
      '${this.name}'
    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = `
      UPDATE departments 
      set name='${this.name}'
      where departments.id = '${id}'
      `;

    return db.execute(sql);
  }

  static DeletebyId(id) {
    let sql = `Delete FROM departments where id=${id};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM departments;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM departments WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findByName(name) {
    let sql = `SELECT * FROM departments WHERE name = '${name}';`;
    return db.execute(sql);
  }

  static findDepartmentIgnorcase(name) {
    let sql = `
    SELECT * FROM Departments
    WHERE LOWER(name) LIKE LOWER('%${name}%')

    `;
    return db.execute(sql);
  }


}

module.exports = Department;

