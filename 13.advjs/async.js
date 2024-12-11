const fs = require("fs/promises");

// const readfile = () => {
//   const datafile = fs.readFileSync("data.txt");
//   console.log(datafile.toString());
// };

// readfile();

// const readfileAsync = () => {
//   fs.readFile("data.txt", function (error, text) {
//     console.log("read first text file");
//     console.log(text.toString());
//   });
//   console.log("second text file");
// };

// readfileAsync();

const AsyncRead = () => {
  fs.readFile("data.txt")
    .then(function (datafile) {
      console.log("1st then");
      console.log(datafile.toString());
    })
    .then(function (datafile) {
      console.log("2nd then");
      console.log(datafile);
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log("3rd text");
};

AsyncRead();

async function WaitRead() {
  let textfile;
  textfile = await fs.readFile("data.txt");
  console.log("1st");
  console.log(textfile.toString());
  console.log("2nd");
  console.log(textfile.toString() + "2nd text");
  console.log("3rd");
}

WaitRead();
