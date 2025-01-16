const path = require("path");

const express = require("express");

const session = require("express-session");
const mongodbstore = require("connect-mongodb-session");
const MongoDBStore = mongodbstore(session);
const sessionStore = new MongoDBStore({
  uri: "mongodb://127.0.0.1:27017",
  databaseName: "auth-demo",
  collection: "sessions",
});

const db = require("./data/database");
const demoRoutes = require("./routes/demo");
const database = require("./data/database");
const { Collection } = require("mongodb");
const { ObjectId } = require("mongodb");
const { userInfo } = require("os");
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

app.use(async function (req, res, next) {
  const user = req.session.user;
  const isauth = req.session.isAuthenticated;

  if (!user || !isauth) {
    return next();
  }

  const userinfo = await db
    .getDb()
    .collection("userdata")
    .findOne({ _id: new ObjectId(user.id) });

  const role = userinfo.role;

  res.locals.isauth = isauth;
  res.locals.role = role;

  next();
});
app.use(demoRoutes);

app.use(function (error, req, res, next) {
  res.render("500");
});

db.connectToDatabase().then(function () {
  app.listen(3000);
});
