const currenttime = new Date().toISOString();

const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: false }));

app.get("/store-user", function (req, res) {
  res.send("<h1>" + currenttime + "</h1>");
}); //localhost:3000/currenttime

app.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><label>Your Name</label><input type = "text" name="username"><button>submit</button></form>'
  );
});

app.post("/store-user", function (res, req) {
  const userName = req.body.username;
  const filepath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filepath);
  const existingUsers = JSON.parse(fileData);
  existingUsers.push(userName);
  fs.writeFileSync(filepath, JSON.stringify(existingUsers));
  console.log(userName);
  res.send("<h1>userName Saved!</h1>");
});

app.listen(3000);

console.log("hello world!");
// const http = require("http");

// const handleRequest = (request, response) => {
//   if (request.url === "/currenttime") {
//     response.statusCode = 200;
//     response.end("<h1>" + currenttime + "<h1>");
//   } else if (request.url === "/") {
//     response.statusCode = 200;
//     response.end("<h1>Hello World!<h1>");
//   }
// };
// const server = http.createServer(handleRequest);

// server.listen(3000);
