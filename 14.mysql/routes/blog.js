const express = require("express");

const db = require("../data/database.js");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const [postings] = await db.query("select * from posts");
  res.render("posts-list", { postings: postings });
});

router.post("/posts", async function (req, res) {
  const contents = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author,
  ];
  await db.query(
    "insert into posts (title, summary,body,authorid) values (?)",
    [contents]
  );
  res.redirect("/posts");
});

router.get("/new-post", async function (req, res) {
  const [authors] = await db.query("select * from authors");
  res.render("create-post", { authors: authors });
});

module.exports = router;
