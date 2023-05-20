const db = require("../config/db");

class Location {

  constructor(name,description) {
    this.name = name;
    this.description = description;
  }

  save() {
    let sql = `
    INSERT INTO locations(
      name,
      description
    )
    VALUES(
      '${this.name}',
      '${this.description}'
    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = `
      UPDATE locations 
      set name='${this.name}',
      description='${this.description}'
      where locations.id = '${id}'
      `;

    return db.execute(sql);
  }

  static DeletebyId(id) {
    let sql = `Delete FROM locations where id=${id};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM locations;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM locations WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findLocationByNameIgnorcase(name) {
    let sql = `
    SELECT * FROM locations
    WHERE LOWER(name) LIKE LOWER('%${name}%')

    `;
    return db.execute(sql);
  }


}

module.exports = Location;

