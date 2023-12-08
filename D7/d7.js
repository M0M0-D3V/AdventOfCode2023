var fs = require("fs");
var file = fs.readFileSync("./D7/d7.txt", "utf-8");
// var file = fs.readFileSync("./D7/test.txt", "utf-8");
var rows = file.split("\r\n");

const partOne = (rows) => {
  let rankBidMap = new Map();
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    line = row.split(" ");
    // get rank for each hand and add to map
    let hand = line[0];
    // get hand rank
    let rank = getRank(rows, hand);
    // parse bid
    let bid = parseInt(line[1]);
    // add rank and bid to map
    rankBidMap.set(rank, bid);
  }
  let total;
  return total;
};

const cardStrength = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};

const getRank = (rows, hand) => {
  let count = 0;
  for (let i = 0; i < rows.length; i++) {
    // do the things here
  }
  return count + 1;
};

console.log(`Part One: `, partOne(rows));
