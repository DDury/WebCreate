const express = require("express");
const router = express.Router();

router.get("/401", function (req, res) {
  res.status(401).render("401");
});

module.exports = router;
