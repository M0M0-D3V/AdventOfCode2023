var fs = require("fs");
var text = fs.readFileSync("./D4/d4.txt", "utf-8");
// var text = fs.readFileSync("./D4/test.txt", "utf-8");
var [...textRows] = text.split("\r\n");

const partOne = (rows) => {
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];

    let winNums = row
      .slice(row.indexOf(":") + 2, row.indexOf("|") - 1)
      .match(/\d+\s*/g)
      .map(Number);

    let scratchNums = row
      .slice(row.indexOf("|") + 2)
      .match(/\d+\s*/g)
      .map(Number);

    let points = 0;
    for (let scratchNum of scratchNums) {
      if (winNums.includes(scratchNum)) {
        if (!points) {
          points = 1;
        } else {
          points *= 2;
        }
      }
    }
    sum += points;
  }
  return sum;
};

const partTwo = (rows) => {
  let total = 0;
  return total;
};

console.log(`Part One: `, partOne(textRows));
console.log(`Part Two: `, partTwo(textRows));
