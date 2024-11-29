const exp = require("constants");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const adrs = ["index", "restaurants", "recommend", "about", "confirm"];

// for (const ad of adrs) {
//   app.get(`/${ad}`, function (req, res) {
//     const htmlpath = path.join(__dirname, "frontend", "views", `${ad}.html`);
//     res.sendFile(htmlpath);
//   });
// }

for (const ad of adrs) {
  app.get(`/${ad}`, function (req, res) {
    const jspath = path.join(__dirname, "data.json");
    const jsdata = fs.readFileSync(jspath);
    const exdata = JSON.parse(jsdata);
    res.render(`${ad}`, {
      numberOfRestaurants: exdata.length,
      restaurants: exdata,
    });
  });
}

app.post("/recommend", function (req, res) {
  const resData = req.body;
  const jspath = path.join(__dirname, "data.json");
  const jsdata = fs.readFileSync(jspath);
  const exdata = JSON.parse(jsdata);
  exdata.push(resData);
  fs.writeFileSync(jspath, JSON.stringify(exdata));
  res.redirect("/confirm");
});

app.listen(3000);
