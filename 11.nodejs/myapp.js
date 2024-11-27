const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

const ad1 = (req, res) => {
  res.send("<h1>Hello World!</h1>");
};

const adform = (req, res) => {
  res.send(
    '<form action="/save-name" method = "POST"><label>Input Your name - </label><input type = "text" name = "username"><button>submit</button></form>'
  );
};

const adsave = (req, res) => {
  const username = req.body.username;

  const filepath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filepath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(username);
  fs.writeFileSync(filepath, JSON.stringify(existingUsers));

  console.log(username);
  res.send("<h1>username saved!</h1>");
};

const userlist = (req, res) => {
  const filepath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filepath);
  const users = JSON.parse(fileData);
  let userData = "<ul>";
  for (const user of users) {
    userData += "<li>" + user + "</li>";
    userData += "</ul>";
  }
  res.send(userData);
};

app.get("/", adform);
// app.get("/form", adform);
app.use(express.urlencoded({ extended: false }));
app.post("/save-name", adsave);
app.get("/user-name", userlist);

app.listen(3000);
