const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  image: String,
  description: String,
});

const Book = mongoose.model("Book", bookSchema, "book");

module.exports = Book;