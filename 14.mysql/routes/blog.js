const express = require("express");

const db = require("../data/database.js");

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const query = `select posts.* ,authors.name as author_name from posts 
    INNER join authors on authorid = authors.id`;

  const [postings] = await db.query(query);
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

router.get("/post-detail/:id", async function (req, res) {
  const query = `select * from posts 
    INNER join authors on authorid = authors.id
    where posts.id = ?`;

  const [post] = await db.query(query, [req.params.id]);
  res.render("post-detail", { post: post[0] });
});

module.exports = router;
