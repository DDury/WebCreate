const fs = require("fs");

const readfile = () => {
  const datafile = fs.readFileSync("data.txt");
  console.log(datafile.toString());
};

readfile();

const readfileAsync = () => {
  fs.readFile("data.txt", function (error, text) {
    console.log("read first text file");
    console.log(text.toString());
  });
  console.log("second text file");
};

readfileAsync();
