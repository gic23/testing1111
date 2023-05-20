const db = require("../config/db");

class DepartmentOption {

  constructor(name,department_id) {
    this.name = name;
    this.department_id = department_id;
  }

  save() {
    let sql = `
    INSERT INTO department_options(
      name,
      department_id
    )
    VALUES(
      '${this.name}',
      '${this.department_id}'

    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = `
      UPDATE department_options 
      set name='${this.name}',  department_id='${this.department_id}'
      where department_options.id = '${id}'
      `;

    return db.execute(sql);
  }

  static DeletebyId(id) {
    let sql = `Delete FROM department_options where id=${id};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT dep_op.*, dep.name as department_name FROM department_options as dep_op join departments as dep on dep_op.department_id=dep.id;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM department_options WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findIdByName(name) {
    let sql = `SELECT id FROM department_options WHERE name = '${name}' ;`;
    return db.execute(sql);
  }

  
  static findDepartmentIgnorcase(name) {
    let sql = `
    SELECT * FROM Department_options
    WHERE LOWER(name) LIKE LOWER('%${name}%')

    `;
    return db.execute(sql);
  }

}

module.exports = DepartmentOption;

