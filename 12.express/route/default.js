const express = require("express");
const Router = express.Router();

Router.get("/", function (req, res) {
  res.redirect("/some/1");
});

Router.get("/some/:id", function (req, res) {
  const paid = req.params.id;
  res.render("index", { rid: "!" });
});

module.exports = Router;
