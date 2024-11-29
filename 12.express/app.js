const exp = require("constants");
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const path = require("path");

const adrs = ["index", "restaurants", "recommend", "about", "confirm"];
const resData = ["name", "address", "cuisine", "website", "description"];

for (const ad of adrs) {
  app.get(`/${ad}`, function (req, res) {
    const htmlpath = path.join(__dirname, "frontend", "view", `${ad}.html`);
    res.sendFile(htmlpath);
  });
}

app.post("/recommend", function (req, res) {
  const resname = req.body;
  const jspath = path.join(__dirname, "data.json");
  const jsdata = fs.readFileSync(jspath);
  const exdata = JSON.parse(jsdata);
  exdata.push(resname);
  fs.writeFileSync(jspath, JSON.stringify(exdata));
  res.redirect("/confirm");
});

app.listen(3000);
