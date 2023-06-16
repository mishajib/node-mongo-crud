const express = require("express");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const expressLayouts = require("express-ejs-layouts");
const route = require("./routes/routes");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { formatDate } = require("./helpers/index.helpers");

// dotenv set
dotenv.config({ path: "./.env" });

// Setup mongodb
mongoose.connect(process.env.DATABASE_LOCAL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Set EJS as template/view engine
app.set("view engine", "ejs");

// Set the path of the views(template) directory
app.set("views", __dirname + "/views");

// body parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware setup
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("layout", "layouts/layout");
app.use(expressLayouts);

// Setup connect flash middleware
app.use(flash());

// Set global variables
app.use((req, res, next) => {
  // Set Content-Type text/html
  res.header("Content-Type", "text/html");

  // Set flash data
  res.locals.successMsg = req.flash("successMsg")[0] || null;
  res.locals.errorMsg = req.flash("errorMsg")[0] || null;
  res.locals.errors = req.flash("errors");
  res.locals.inputValues = req.flash("inputValues")[0] || {};
  res.locals.validationErrors = req.flash("validationErrors")[0] || {};
  res.locals.formatDate = formatDate;

  // set current url
  res.locals.currentUrl = req.path;

  next();
});

// Method override
app.use(methodOverride("_method"));

// Route setup
app.use("/", route);

// 404 Error Handler
app.use((req, res, next) => {
  return res.status(404).redirect("/404");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  // Check if the error status is 404
  if (err.status === 404) {
    return res.status(404).redirect("/404");
  } else {
    console.log(err);
    // For other errors, you can customize the error response
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running at - http://localhost:${PORT}`);
});
