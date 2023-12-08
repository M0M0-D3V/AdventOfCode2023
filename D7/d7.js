var fs = require("fs");
// var file = fs.readFileSync("./D7/d7.txt", "utf-8");
var file = fs.readFileSync("./D7/test.txt", "utf-8");
var rows = file.split("\r\n");

let rankBidMap = new Map();
let cardTypes = {
  fiveKind: new Map(),
  fourKind: new Map(),
  fullHouse: new Map(),
  threeKind: new Map(),
  twoPair: new Map(),
  onePair: new Map(),
  highCard: new Map(),
};

const partOne = () => {
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    line = row.split(" ");
    // get rank for each hand and add to map
    let hand = line[0];
    let bid = parseInt(line[1]);
    // get hand type
    let type = getType(hand);
    // save to type map
    saveType(type, hand, bid);
    console.log(cardTypes);
  }
  // get hand ranks
  setRanks(cardTypes[fiveKind]);
  setRanks(cardTypes[fourKind]);
  setRanks(cardTypes[fullHouse]);
  setRanks(cardTypes[threeKind]);
  setRanks(cardTypes[twoPair]);
  setRanks(cardTypes[onePair]);
  setRanks(cardTypes[highCard]);
  // let rank = getRank(hand);
  // add rank and bid to map
  // rankBidMap.set(rank, bid);
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

const getType = (hand) => {
  let seen = {};
  for (let char of hand) {
    if (seen[char]) {
      seen[char]++;
    } else {
      seen[char] = 1;
    }
  }

  for (let count in seen) {
    if (seen[count] === 5) {
      return "fiveKind";
    }
    if (seen[count] === 4) {
      return "fourKind";
    }
    if (seen[count] === 3) {
      for (let c in seen) {
        if (seen[c] === 2) {
          return "fullHouse";
        }
      }
      return "threeKind";
    }
    if (seen[count] === 2) {
      for (let c in seen) {
        if (seen[c] === 2 && c !== count) {
          return "twoPair";
        }
        if (seen[c] === 3) {
          return "fullHouse";
        }
      }
      return "onePair";
    }
    if (seen[count] === 1) {
      let ones = 0;
      for (let c in seen) {
        if (seen[c] === 1) {
          ones++;
        }
      }
      if (ones === 5) {
        return "highCard";
      }
    }
  }
};

const saveType = (type, hand, bid) => {
  cardTypes[type].set(hand, bid);
};

const setRanks = (typeMap) => {
  typeMap.forEach((value, key) => {});
};

console.log(`Part One: `, partOne());
