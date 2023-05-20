const db = require("../config/db");

class BookDepartment {

  constructor(id_book, id_department) {
    this.id_book = id_book;
    this.id_department = id_department;
  }

  save() {
    let sql = `
    INSERT INTO book_department(
      id_book,
      id_department
    )
    VALUES(
      '${this.id_book}',
      '${this.id_department}'

    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = `
      UPDATE book_department 
      set id_book='${this.id_book}',  department_id='${this.id_department}'
      where department_options.id = '${id}'
      `;
    return db.execute(sql);
  }

  static DeletebyId(id_book, id_department) {
    let sql = `Delete FROM book_department where id_book=${id_book} AND id_department=${id_department};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * from book_department;";
    return db.execute(sql);
  }


  static findBookByDepartmentId(id_department) {
    let sql = `SELECT b.*,l.name as location FROM 
      book_department AS bd
      JOIN books AS b ON bd.id_book=b.id 
      JOIN locations as l on b.location_id=l.id
      where bd.id_department= ${id_department}
    `;
    return db.execute(sql);
  }


  static findBookNotInDepartmentId(id_department) {
    let sql = `
    SELECT b.*,l.name as location FROM 
        books AS b
        JOIN locations as l on l.id=b.location_id
        WHERE b.id NOT IN (
          SELECT b.id FROM 
          book_department AS bd
          JOIN books AS b ON bd.id_book=b.id
          WHERE bd.id_department= ${id_department}
        );
    `;
    return db.execute(sql);
  }

}

module.exports = BookDepartment;

