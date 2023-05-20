const db = require("../config/db");

class Book {

  constructor(title, author, year, ddc_code, item_code, shelt_number, location_id, characteristic, available_status) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.ddc_code = ddc_code;
    this.item_code = item_code;
    this.shelt_number = shelt_number;
    this.location_id = location_id;
    this.characteristic = characteristic;
    this.available_status = available_status;

  }

  save() {
    let sql = `
    INSERT INTO books(
      title,
      author,
      year,
      ddc_code,
      item_code,
      shelt_number,
      location_id,
      characteristic,
      available_status
    )
    VALUES(
      '${this.title}',
      '${this.author}',
      '${this.year}',
      '${this.ddc_code}',
      '${this.item_code}',
      '${this.shelt_number}',
      '${this.location_id}',
      '${this.characteristic}',
      '${this.available_status}'
    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql = `
      UPDATE books 
      set title='${this.title}',
      author='${this.author}',
      year='${this.year}',
      ddc_code='${this.ddc_code}',
      item_code='${this.item_code}',
      shelt_number='${this.shelt_number}',
      location_id='${this.location_id}',
      characteristic='${this.characteristic}',
      available_status='${this.available_status}'
      where books.id = '${id}'
      `;

    return db.execute(sql);
  }

  static DeleteById(id) {
    let sql = `Delete FROM books where id=${id};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT b.*, l.name AS location
    FROM books AS b
    JOIN locations AS l ON l.id=b.location_id`;
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM books WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findBookByItemCode(search) {
    let sql = `SELECT * FROM books WHERE item_code like '%${search}%' OR ddc_code like '%${search}%' ;`;
    return db.execute(sql);
  }

}

module.exports = Book;

