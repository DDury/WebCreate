const express = require("express");

const db = require("../data/database");
const database = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  const posts = await db.getdb().collection("posts").find().toArray();
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
  const authors = await db.getdb().collection("authors").find().toArray();
  console.log(authors);
  // console.log(database);
  res.render("create-post", { authors: authors });
});

router.post("/posts", async function (req, res) {
  const objectid = new ObjectId(req.body.author);
  const authordata = await db
    .getdb()
    .collection("authors")
    .findOne({ _id: objectid });
  const newpost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    date: new Date(),
    author: {
      id: objectid,
      name: authordata.name,
      email: authordata.email,
    },
  };
  await db.getdb().collection("posts").insertOne(newpost);
  res.redirect("/posts");
});

router.get("/add-author", function (req, res) {
  res.render("create-author");
});

router.post("/add-author", async function (req, res) {
  const authordata = {
    name: req.body.name,
    email: req.body.email,
  };
  await db.getdb().collection("authors").insertOne(authordata);
  res.redirect("/posts");
});

router.get("/detail/:id", async function (req, res) {
  const id = new ObjectId(req.params.id);
  const post = await db.getdb().collection("posts").findOne({ _id: id });
  res.render("post-detail", { post: post });
});

router.get("/posts/edit/:id", async function (req, res) {
  const id = new ObjectId(req.params.id);
  const post = await db.getdb().collection("posts").findOne({ _id: id });
  res.render("update-post", { post: post });
});

router.post("/update-post/:id", async function (req, res) {
  const id = new ObjectId(req.params.id);
  const update = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    update: new Date(),
  };
  await db.getdb().collection("posts").updateOne({ _id: id }, { $set: update });
  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  const id = new ObjectId(req.params.id);
  await db.getdb().collection("posts").deleteOne({ _id: id });
  res.redirect("/posts");
});
module.exports = router;

//title summary body date author(id,name,email)
