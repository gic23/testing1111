const BookDepartment = require("../models/BookDepartment");


exports.getAll = async (req, res, next) => {
  try {
    console.log("get");
    const [bookdepartment, _] = await BookDepartment.findAll();
    res.status(200).json({ count: bookdepartment.length, bookdepartment });
  } catch (error) {
    next(error);
  }
};

exports.createNewDepartmentOption = async (req, res, next) => {
  try {
    let { name, department_id } = req.body;

    let departmentoption = new Departmentoption(name, department_id);

    departmentoption = await departmentoption.save();
    res.status(201).json({ message: "Department Option created" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getBookNotYetSelect = async (req, res, next) => {

  let id = req.params.id;

  let [books, _] = await BookDepartment.findBookNotInDepartmentId(id);

  res.status(200).json({ book: books });

};
exports.getBookByDepartmentId = async (req, res, next) => {
  let id = req.params.id;
  let [books, _] = await BookDepartment.findBookByDepartmentId(id);

  res.status(200).json({ book: books });
};

exports.insertBookDepartment = async (req, res, next) => {
  var { id_department, id_book } = req.body;

  id_book.forEach(async item => {
    var bookDepartment = new BookDepartment(item, id_department);
    await bookDepartment.save();
  });


  res.status(200).json({ status: true, message: "Insert Success" });

};
exports.deleteBook = async (req, res, next) => {
  var { id_department, id_book } = req.body;



  id_book.forEach(item => {
    var DeleteBook = BookDepartment.DeletebyId(item, id_department);
  });


  res.status(200).json({ status: true, message: "Delete Success" });
};


