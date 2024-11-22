const currenttime = new Date().toISOString();

const express = require("express");

const app = express();

app.get("/currenttime", function (req, res) {
  res.send("<h1>" + currenttime + "</h1>");
}); //localhost:3000/currenttime

app.get("/", function (req, res) {
  res.send("<form><label>Your Name</label><input type = 'text'></form>");
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
