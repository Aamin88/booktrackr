const Books =
  process.env.NODE_ENV === "test"
    ? require("../models/seedModel.model")
    : require("../models/book.model");

const bookServices = require("../services/books.services");
const runGemini = require("../utils/generateText");
const extraData = require("../utils/extractJSONData");

const asyncHandler = require("express-async-handler");

const gcsUploader = require("../utils/gcsUploader");

const sharp = require("sharp");

// @Desc  Get all books
// @method  GET /books
// @Access  Public
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Books.find({});

  if (!books) {
    res.status(400);
    throw new Error("Could not fetch all books");
  }

  res.status(200).json({
    status: "OK",
    books: books,
  });
});

// @Desc  Get a books
// @method  GET /books/:id
// @Access  Public
const getBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  if (!bookId) {
    res.status(400);
    throw new Error("no book id");
  }

  const book = await Books.findById(bookId);

  if (!book) {
    res.status(400);
    throw new Error(`book record with id ${bookId} not found`);
  }

  if (book.aiSummary.length !== 0) {
    res.status(200).json({
      status: "OK",
      book: book,
    });
    return;
  }

  const summary = await runGemini(book.title, book.author);
  const data = extraData(summary);

  const updatedRecord = await Books.findByIdAndUpdate(
    { _id: bookId },
    { aiSummary: data }
  );

  if (updatedRecord) {
    const updatedBook = await Books.findById(bookId);
    res.status(200).json({
      status: "OK",
      book: updatedBook,
    });
  } else {
    res.status(200).json({
      status: "OK",
      book: book,
    });
  }
});

// @Desc  Create a new book record
// @method  POST /books
// @Access  Public
const createBooks = asyncHandler(async (req, res) => {
  if (process.env.NODE_ENV === "test") {
    // bookServices.createBook(req, res);
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
    return;
  }

  const { title, author, dateOfPublication, genre, desc } = req.body;

  const imgfile = req?.file;

  console.log(imgfile);

  if (!title || !author) {
    res.status(400);
    throw new Error("title, filepath and author field can't be left empty");
  }

  const existedBook = await Books.findOne({ title });

  if (existedBook) {
    res.status(403);
    throw new Error("book record alright exits");
  }

  let newBook = {
    title,
    author,
    dateOfPublication,
    genre,
    description: desc,
  };

  if (imgfile) {
    const coverImg = await gcsUploader(imgfile.buffer, imgfile.originalname);
    newBook = { ...newBook, coverImg };
  }

  const newRecord = await Books.create(newBook);

  if (newRecord) {
    res.status(201).json({
      msg: "created",
      book: newRecord,
    });
  } else {
    res.status(400);
    throw new Error("unable to create new record");
  }
});

// @Desc Update a book record
// @method  PUT /books/:id
// @Access  Public
const updateBooks = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  let body = req.body;
  const imgFile = req?.file;

  // if image file, store to gcs, and destructure the public url into the body object to update db
  if (imgFile) {
    const coverImg = await gcsUploader(imgFile.buffer, imgFile.originalname);
    body = { ...req.body, coverImg: coverImg };
  }

  const bookRecord = await Books.findOne({ _id: bookId });

  if (!bookRecord) {
    res.status(400);
    throw new Error(`book record with id ${bookId} not found.`);
  }

  const updatedRecord = await Books.findByIdAndUpdate({ _id: bookId }, body);

  if (updatedRecord) {
    const book = await Books.findById(bookId);
    res.status(200).json({
      updatedRecord: book,
    });
  } else {
    res.status(400);
    throw new Error("could not update book record");
  }
});

// @Desc  Remove a book record
// @method  DELETE /books/:id
// @Access  Public
const deleteBooks = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  const bookRecord = await Books.findOne({ _id: bookId });

  if (!bookRecord) {
    res.status(400);
    throw new Error(`book record with id ${bookId} not found.`);
  }

  const updatedRecord = await Books.findByIdAndDelete({ _id: bookId });

  if (updatedRecord) {
    res.sendStatus(204);
  } else {
    res.status(405);
    throw new Error("could not delete book record");
  }
});

module.exports = {
  getAllBooks,
  getBook,
  createBooks,
  updateBooks,
  deleteBooks,
};
