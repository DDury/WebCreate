const express = require("express");
const Router = express.Router();
const readData = require("../util/getdata.js");
const uuid = require("uuid");

const adrs = ["index", "restaurants", "recommend", "about", "confirm"];

// for (const ad of adrs) {
//   Router.get(`/${ad}`, function (req, res) {
//     const htmlpath = path.join(__dirname, "frontend", "views", `${ad}.html`);
//     res.sendFile(htmlpath);
//   });
// }

for (const ad of adrs) {
  Router.get(`/${ad}`, function (req, res) {
    const exdata = readData.getData();
    let order = req.query.ordery;
    let nextorder = "desc";

    if (order === "asc") {
      nextorder = "desc";
    } else nextorder = "asc";

    exdata.sort(function (resA, resB) {
      if (
        (resA.name > resB.name && order == "asc") ||
        (resA.name < resB.name && order == "desc")
      ) {
        return 1;
      }
      return -1;
    });

    res.render(`${ad}`, {
      numberOfRestaurants: exdata.length,
      restaurants: exdata,
      rid: "!",
      order: nextorder,
    });
  });
}

Router.get("/restaurants/:id", function (req, res) {
  const resId = req.params.id;
  const exdata = readData.getData();
  exdata.forEach((restaurant) => {
    if (restaurant.name === resId) {
      return res.render("resid", { rid: resId, res: restaurant });
    } else {
      // res.render("error/404error");
    }
  });
});

Router.post("/recommend", function (req, res) {
  const resData = req.body;
  resData.id = uuid.v4();
  /// util 에서 가져옴 ///
  const exdata = readData.getData();
  exdata.push(resData);
  readData.storeData(exdata);
  res.redirect("/confirm");
});

module.exports = Router;
