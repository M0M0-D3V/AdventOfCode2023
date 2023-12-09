var fs = require("fs");
// var file = fs.readFileSync("./D7/d7.txt", "utf-8");
// var file = fs.readFileSync("./D7/test.txt", "utf-8");
var file = fs.readFileSync("./D7/test2.txt", "utf-8");
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
  sortRanks(
    allHands.filter((hand) => {
      return hand.type === "highCard";
    })
  );
  sortRanks(
    allHands.filter((hand) => {
      return hand.type === "onePair";
    })
  );
  sortRanks(
    allHands.filter((hand) => {
      return hand.type === "twoPair";
    })
  );
  sortRanks(
    allHands.filter((hand) => {
      return hand.type === "threeKind";
    })
  );
  sortRanks(
    allHands.filter((hand) => {
      return hand.type === "fullHouse";
    })
  );
  sortRanks(
    allHands.filter((hand) => {
      return hand.type === "fourKind";
    })
  );
  sortRanks(
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

const sortByStrengthIndex = (arr, index) => {
  for (let i = 0; i < arr.length - 1; i++) {
    let thisHand = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      let nextHand = arr[j];
      //compare card strength
      if (thisHand.strengths[index] > nextHand.strengths[index]) {
        // if first is bigger, then swap places
        let holdHand = thisHand;
        arr[i] = nextHand;
        arr[j] = holdHand;
      }
    }
  }
  return arr;
};

const sortRanks = (handsArray) => {
  if (!handsArray.length) {
    return;
  }
  let lookNextCard = false;
  let c = 0;
  let sortArray = sortByStrengthIndex(handsArray, c);

  // loop and if no competing strengths, assign rank
  //
  do {
    let tieBreak = [];
    lookNextCard = false;
    // sort cth place
    for (let i = 0; i < sortArray.length - 1; i++) {
      let thisHand = sortArray[i];
      let nextHand = sortArray[i + 1];
      if (thisHand.strengths[c] === nextHand.strengths[c]) {
        if (!tieBreak.includes(thisHand)) {
          tieBreak.push(thisHand);
        }
        if (!tieBreak.includes(nextHand)) {
          tieBreak.push(nextHand);
        }
      }
      if (tieBreak.length) {
        sortArray = tieBreak;
        lookNextCard = true;
      } else {
        lookNextCard = false;
      }
    }

    c++;
  } while (lookNextCard);

  handsArray = sortArray.concat(handsArray.slice(sortArray.length));

  for (let hand of handsArray) {
    console.log(hand);
    let rank = rankBidMap.size + 1;
    rankBidMap.set(rank, hand.bid);
  }
};

console.log(`Part One: `, partOne(rows));
