const express = require("express");

const db = require("../data/database");
const database = require("../data/database");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
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
      id: new ObjectId(req.body.author),
      name: authordata.name,
      email: authordata.email,
    },
  };
  await db.getdb().collection("posts").insertOne(newpost);
  res.redirect("/posts");
});

module.exports = router;

//title summary body date author(id,name,email)
