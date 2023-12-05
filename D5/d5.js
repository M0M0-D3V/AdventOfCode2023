var fs = require("fs");
// var text = fs.readFileSync("./D5/d5.txt", "utf-8");
var text = fs.readFileSync("./D5/test.txt", "utf-8");
var [...textRows] = text.split("\r\n");

const partOne = (rows) => {
  let sum = 0;
  return sum;
};

console.log(`part one: `, partOne(textRows));
