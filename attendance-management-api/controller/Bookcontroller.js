const Book = require("../models/Book");

exports.getBooks = async (req, res, next) => {
  try {
    const [book, _] = await Book.findAll();
    res.status(200).json({ count: book.length, book });
  } catch (error) {
    next(error);
  }
};

exports.createNewBook = async (req, res, next) => {
  try {
    let {title,author,year,ddc_code,item_code,shelt_number,location_id,characteristic,available_status} = req.body;

    let book = new Book(title,author,year,ddc_code,item_code,shelt_number,location_id,characteristic,available_status);

    book = await book.save();
    res.status(201).json({ message: "Book created" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    let {title,author,year,ddc_code,item_code,shelt_number,location_id,characteristic,available_status} = req.body;
    var id = req.params.id;
  
    let book = new Book(title,author,year,ddc_code,item_code,shelt_number,location_id,characteristic,available_status);

    book = await book.edit(id);
    res.status(201).json({ message: "Book modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let [book, _] = await Book.findById(id);

    res.status(200).json({ book: book[0] });
  } catch (error) {
    next(error);
  }
};

exports.findBookByItemCode = async (req, res, next) => {
  try {
    let search = req.params.search;
    let [book, _] = await Book.findBookByItemCode(search);
      if(book[0]){
        res.status(200).json({ book: book[0] });
      }else{
        res.status(200).json({ book: "not_found" });
      }

  } catch (error) {

    next(error);
  }
};

exports.deleteBookById = async (req, res, next) => {
  try {
    let id = req.params.id;
    let book = await Book.DeleteById(id);
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    next(error);
  }
};

