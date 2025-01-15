const path = require("path");

const express = require("express");

const session = require("express-session");
const mongodbstore = require("connect-mongodb-session");
const MongoDBStore = mongodbstore(session);
const sessionStore = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

const db = require("./data/database");
const demoRoutes = require("./routes/demo");
const database = require("./data/database");
const { Collection } = require("mongodb");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
