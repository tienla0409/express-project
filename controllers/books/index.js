const Book = require("../../models/book.model");

module.exports = {
  getBooks: async function (req, res, next) {
    try {
      const listBook = await Book.find();
      res.render("books", {
        title: "List Book",
        listBook,
        user: req.session.user
      });
    } catch (err) {
      res.status(404).send("List empty");
    }
  },
};