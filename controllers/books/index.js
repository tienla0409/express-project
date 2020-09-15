const Book = require("../../models/book.model");

module.exports = {
  getBooks: async function (req, res, next) {
    if (!req.query.page) return res.redirect("/books?page=1");
    try {
      const page = parseInt(req.query.page) || 1;
      const perPage = 8;

      const start = (page - 1) * perPage;
      const end = page * perPage;

      const listBook = await Book.find().skip(start).limit(perPage);

      const totalPage = Math.ceil(listBook.length / perPage);
      const currentPage = Math.ceil(end / perPage);

      res.render("books", {
        title: "List Book",
        listBook,
        currentPage,
        user: req.cookies.jwt
      });
    } catch (err) {
      res.status(404).send(err.message);
    }
  },
};