var fs = require("fs");
var file = fs.readFileSync("./D7/d7.txt", "utf-8");
// var file = fs.readFileSync("./D7/test.txt", "utf-8");
// var file = fs.readFileSync("./D7/test2.txt", "utf-8");
var rows = file.split("\r\n");

let rankBidMap = new Map();

class Hand {
  constructor(cards, bid, type, strengths) {
    this.cards = cards;
    this.bid = bid;
    this.type = type;
    this.strengths = strengths;
  }
}

let allHands = [];

const partOne = (rows) => {
  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    line = row.split(" ");
    // get rank for each hand and add to map
    let hand = line[0];
    let bid = parseInt(line[1]);
    // get hand type
    let type = getType(hand);
    // get strengths []
    let strengths = getStrengths(hand);
    allHands.push(new Hand(hand, bid, type, strengths));
  }
  // get hand ranks
  sortAndCalculateRanks(
    allHands.filter((hand) => {
      return hand.type === "highCard";
    })
  );
  sortAndCalculateRanks(
    allHands.filter((hand) => {
      return hand.type === "onePair";
    })
  );
  sortAndCalculateRanks(
    allHands.filter((hand) => {
      return hand.type === "twoPair";
    })
  );
  sortAndCalculateRanks(
    allHands.filter((hand) => {
      return hand.type === "threeKind";
    })
  );
  sortAndCalculateRanks(
    allHands.filter((hand) => {
      return hand.type === "fullHouse";
    })
  );
  sortAndCalculateRanks(
    allHands.filter((hand) => {
      return hand.type === "fourKind";
    })
  );
  sortAndCalculateRanks(
    allHands.filter((hand) => {
      return hand.type === "fiveKind";
    })
  );

  let total = 0;
  rankBidMap.forEach((value, key) => {
    console.log(`key: ${key} * val ${value}`);
    total += parseInt(key) * parseInt(value);
  });
  return total;
};

const partTwo = (rows) => {
  return 0;
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

const getStrengths = (hand) => {
  let strengths = [];
  for (let card of hand) {
    strengths.push(cardStrength[card]);
  }
  return strengths;
};

const sortHands = (hands) => {
  let isSorted;
  for (let i = 0; i < hands.length; i++) {
    for (let j = 1; j < hands.length - i; j++) {
      let hand1 = hands[j - 1];
      let hand2 = hands[j];
      //compare card strength
      if (compareHands(hand1, hand2)) {
        hands = swapHands(hands, j, j - 1);
        isSorted = false;
      }
    }
    if (isSorted) return hands;
  }
  return hands;
};

const compareHands = (hand1, hand2) => {
  for (let i = 0; i < hand1.strengths.length; i++) {
    if (hand1.strengths[i] === hand2.strengths[i]) {
      continue;
    }
    // if first is bigger, then swap places
    if (hand1.strengths[i] > hand2.strengths[i]) {
      return true;
    }
    if (hand1.strengths[i] < hand2.strengths[i]) {
      return false;
    }
  }
};

const swapHands = (hands, index1, index2) => {
  let holdHand = hands[index1];
  hands[index1] = hands[index2];
  hands[index2] = holdHand;
  return hands;
};

const sortAndCalculateRanks = (handsArray) => {
  if (!handsArray.length) {
    return;
  }
  let sortArray = sortHands(handsArray);

  for (let hand of sortArray) {
    console.log(hand);
    let rank = rankBidMap.size + 1;
    rankBidMap.set(rank, hand.bid);
  }
};

// console.log(`Part One: `, partOne(rows));
console.log(`Part Two: `, partTwo(rows));
