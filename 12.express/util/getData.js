const fs = require("fs");
const path = require("path");

const jspath = path.join(__dirname, "..", "data.json");

const getData = () => {
  const jsdata = fs.readFileSync(jspath);
  const exdata = JSON.parse(jsdata);
  return exdata;
};

const storeData = (data) => {
  fs.writeFileSync(jspath, JSON.stringify(data));
};

module.exports = {
  getData: getData,
  storeData: storeData,
};
