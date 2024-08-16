const Books = require("../models/book.model");
const asyncHandler = require("express-async-handler");
const Summary = require("../models/summary.model");
const runGemini = require("../utils/generateText");
const gcsUploader = require("../utils/gcsUploader");
const path = require("path");
const fs = require("fs").promises;

// use this to resize cover photos later.
const sharp = require("sharp");

// @Desc  Get all books
// @method  GET /books
// @Access  Public
const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Books.find({});

  if (!books) {
    res.status(400);
    throw new Error("Could not fetch books");
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

  const book = await Books.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error(`book record with id ${bookId} not found`);
  }

  const bookSummary = await Summary.findOne({ book: bookId });

  if (!bookSummary) {
    res.status(404);
    throw new Error(`summary with id ${bookId} not found`);
  }
  console.log(bookSummary);

  res.status(200).json({
    book: book,
    summary: bookSummary,
  });
});

// @Desc  Create a new book record
// @method  POST /books
// @Access  Public
const createBooks = asyncHandler(async (req, res) => {
  const { title, author, dateOfPublication, genre, desc } = req.body;

  const imgfile = req?.file;

  if (!title || !author) {
    res.status(400);
    throw new Error("title and author field must be filled");
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
  } else {
    const imagePath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "booktrackr.png"
    );
    const fileBuffer = await fs.readFile(imagePath);

    const coverImg = await gcsUploader(fileBuffer, path.basename(imagePath));

    newBook = { ...newBook, coverImg };
  }

  const book = await Books.create(newBook);

  if (!book) {
    res.status(400);
    throw new Error("could not create book record");
  }

  const aiSummary = await runGemini(book.title, book.author);

  const bookSummary = await Summary.create({
    book: book._id,
    summary: aiSummary,
  });

  if (aiSummary.length === 0 && bookSummary.summary.length === 0) {
    await Summary.findByIdAndDelete(bookSummary._id);
    await Books.findByIdAndDelete(book._id);
    res.status(406);
    throw new Error("could not create a summar for the book");
  }

  res.status(201).json({
    summary: bookSummary,
    book: book,
  });
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
