var fs = require("fs");
const { isNumberObject } = require("util/types");
var textArr = fs.readFileSync("./D1/d1.txt", "utf-8");
// var textArr = fs.readFileSync("./D1/test.txt", "utf-8");
var [...outputs] = textArr.split("\r\n");

// find calibrations (add first and last digits) and total them

const parseNumber = (match) => {
  switch (match) {
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
  }
};

const partOne = (outputs) => {
  let sum = 0;
  for (let row of outputs) {
    let sub = 0;
    // console.log(`row is: ${row}`);
    let first;
    let last;

    let match = [...row.matchAll(/\d/g)];
    if (match.length) {
      first = match[0][0];
      last = match[match.length - 1][0];
    }

    sub = first + last;
    // console.log(`subtotal: ${sub}`);
    sum += Number(sub);
    // console.log(`running total ${sum}\n`);
  }
  console.log(`sum Part One is: ${sum}`);
};

const partTwo = (outputs) => {
  let sum = 0;
  for (let row of outputs) {
    let sub = 0;
    console.log(`\nrow is: ${row}`);
    let first;
    let last;
    let match = [
      ...row.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine))|\d/g),
    ];
    if (match.length) {
      if (parseInt(match[0][0]) <= 9) {
        first = match[0][0];
      } else if (isNaN(match[0][1])) {
        first = parseNumber(match[0][1]);
      }

      if (parseInt(match[match.length - 1][0]) <= 9) {
        last = match[match.length - 1][0];
      } else if (isNaN(match[match.length - 1][1])) {
        last = parseNumber(match[match.length - 1][1]);
      }
    }

    sub = first + last;
    console.log(`subtotal: ${sub}`);
    sum += Number(sub);
  }
  console.log(`sum Part Two is ${sum}`);
};

partOne(outputs);
partTwo(outputs);
