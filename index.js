require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");

// import core module
const path = require("path");

// import middleware custom
const authMiddleware = require("./middleware/auth.middleware");

// connect mongodb
mongoose.connect(process.env.MONGODB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error"));
db.on("open", function () {
  console.log("connect success");
});

// initial instance express
const app = express();
const PORT = 3001;

// set default template engine
app.set("view engine", "pug");

// set views
app.set("views", path.join(__dirname, "views"));

// set use file static
app.use(express.static(path.join(__dirname, 'public')));

// use middler third-party
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));
app.use(session({
  resave: true,
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  },
}));

// import Routers
const loginRouter = require("./routes/login.router");
const logoutRouter = require("./routes/logout.router");
const forgotRouter = require("./routes/forgot.router");
const registerRouter = require("./routes/register.router");
const booksRouter = require("./routes/books.router");

// use Routers
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/forgot", forgotRouter);
app.use("/register", registerRouter);
app.use("/books", authMiddleware.authLogin, booksRouter);

app.get("/", (req, res) => {
  res.render("home", {
    user: req.session.user
  });
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));