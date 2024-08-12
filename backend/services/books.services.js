const Books =
  process.env.NODE_ENV === "test"
    ? require("../models/seedModel.model")
    : require("../models/book.model");

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
const createBook = async (req, res) => {
  const { _id, title, author, dateOfPublication, genre, desc } = req.body;
  const file = req?.file;

  console.log(file);
  if (!title || !author) {
    res.status(400);
    throw new Error("title, filepath and author field can't be left empty");
  }

  const coverImg = gcsUploader(file.buffer, file.originalname);

  const existedBook = await Books.findOne({ title });

  if (existedBook) {
    res.status(403);
    throw new Error("book record alright exits");
  }

  const newRecord = await Books.create({
    _id,
    title,
    author,
    dateOfPublication,
    genre,
    coverImg: coverImg,
    description: desc,
  });

  if (newRecord) {
    res.status(201).json({
      msg: "created",
      book: newRecord,
    });
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
    const findBook = await Books.findByIdAndUpdate(id);
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
