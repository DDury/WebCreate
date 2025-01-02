const express = require("express");
const db = require("../data/database");
const multer = require("multer");

const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storageConfig });

const router = express.Router();

router.get("/", async function (req, res) {
  const users = await db.getDb().collection("users").find().toArray();
  res.render("profiles", { users: users });
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), async function (req, res) {
  const uploadimage = req.file;
  const contents = req.body;
  await db.getDb().collection("users").insertOne({
    name: contents.username,
    imagepath: uploadimage.path,
  });
  res.redirect("/");
});

module.exports = router;
