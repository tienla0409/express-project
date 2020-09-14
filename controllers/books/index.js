module.exports = {
  getBooks: function (req, res, next) {
    res.render("books", {
      title: "List Book"
    });
  },
};