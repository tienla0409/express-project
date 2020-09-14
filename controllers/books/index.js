const Book = require("../../models/book.model");

module.exports = {
  getBooks: async function (req, res, next) {
    try {
      const listBook = await Book.find();
      console.log(listBook);
      res.render("books", {
        title: "List Book",
        listBook
      });
    } catch (err) {
      res.status(404).send("List empty");
    }
  },
};