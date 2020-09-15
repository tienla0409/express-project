const Book = require("../../models/book.model");

module.exports = {
  getBooks: async function (req, res, next) {
    try {
      const listBook = await Book.find();

      const page = parseInt(req.query.page) || 1;
      const perPage = 8;

      const start = (page - 1) * perPage;
      const end = page * perPage;

      const books = listBook.splice(start, end);

      const totalPage = Math.ceil(listBook.length / perPage);
      const currentPage = Math.ceil(end / perPage);

      res.render("books", {
        title: "List Book",
        books: books.splice(start, end),
        currentPage,
        user: req.session.user
      });
    } catch (err) {
      res.status(404).send("List empty");
    }
  },
};