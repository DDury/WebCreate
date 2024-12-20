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
  const postdata = {
    ...post[0],
    date: post[0].date.toLocaleDateString(),
  };

  res.render("post-detail", { post: postdata });
});

router.get("/update/:id", function (req, res) {
  const id = req.params.id;
  res.render("update-post", { id: id });
});

router.post("/modify/:id", async function (req, res) {
  const innercontents = [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ];

  const query = `
  update posts 
  set title = ?, summary = ?, body = ? 
  where id = ?
  `;
  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id,
  ]);

  res.redirect("/");
});

module.exports = router;
