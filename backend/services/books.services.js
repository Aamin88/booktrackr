const Books = require("../models/book.model");

// retrieve all books from the database
const getBooks = async () => {
  try {
    const books = await Books.find({});
    return books;
  } catch (err) {
    return err;
  }
};

// create a book record
const createBook = async (formData) => {
  const existedBook = await Books.findOne({ title });

  if (existedBook) {
    res.status(403);
    throw new Error("book record alright exits");
  }

  const book = await Books.create(formData);

  if (newRecord) {
    return book;
  } else {
    res.status(400);
    throw new Error("unable to create new record");
  }
};

// update a book record using ID
const updateBook = async (id, bookDetails) => {
  try {
    const findBook = await Books.findByIdAndUpdate(id, bookDetails);
  } catch (error) {
    return error;
  }
};

// delete a book record using ID
const deleteBook = async (id) => {
  try {
    await Books.findByIdAndDelete(id);
  } catch (error) {
    return error;
  }
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
