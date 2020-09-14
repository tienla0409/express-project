const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

// connect mongodb
mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connect error"));
db.on("open", function () {
  console.log("connect success");
});

// import core module
const path = require("path");

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
// app.use(cookieSession({
//   keys: "stonehihi",
//   maxAge: 24 * 60 * 60 * 1000, //24h
// }));

// import Routers
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const booksRouter = require("./routes/books");

// use Routers
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));