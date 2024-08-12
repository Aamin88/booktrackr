const router = require("express").Router();

const uploads = require("../config/uploads");
const {
  getAllBooks,
  getBook,
  createBooks,
  updateBooks,
  deleteBooks,
} = require("../controllers/books.controller");

router.route("/").get(getAllBooks).post(uploads.single("imgfile"), createBooks);
router
  .route("/:id")
  .get(getBook)
  .put(uploads.single("imgfile"), updateBooks)
  .delete(deleteBooks);

module.exports = router;
