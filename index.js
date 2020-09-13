const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

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
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// import Routers
const loginRouter = require("./models/login");

// use Routers
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));