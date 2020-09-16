const Book = require("../../models/book.model");

module.exports = {
  getItem: async (req, res, next) => {
    const id = req.params.id;
    const book = await Book.findOne({
      _id: id
    });

    res.render("book_item.pug", {
      title: book.title,
      book,
      user: req.cookies.user
    });
  },
};