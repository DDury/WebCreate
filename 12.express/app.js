const exp = require("constants");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const defauleRoutes = require("./route/default.js");
const resRoutes = require("./route/restaurant.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/", defauleRoutes);
app.use("/", resRoutes);

app.use(function (req, res) {
  res.status(404).render("error/404error");
});

// app.use(function (error, req, res, next) {
//   res.status(500).render("error/505error");
// });

app.listen(2000);
