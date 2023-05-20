const db = require("../config/db");

class CandidateType {

  constructor(name) {
    this.name = name;
  }

  save() {
    let sql = `
    INSERT INTO candidate_type(
      name
    )
    VALUES(
      '${this.name}'
    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = `
      UPDATE candidate_type 
      set name='${this.name}'
      where candidate_type.id = '${id}'
      `;

    return db.execute(sql);
  }

  static DeletebyId(id) {
    let sql = `Delete FROM candidate_type where id=${id};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM candidate_type;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM candidate_type WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findByName(name) {
    let sql = `SELECT * FROM candidate_type WHERE name = '${name}';`;
    return db.execute(sql);
  }


}

module.exports = CandidateType;

