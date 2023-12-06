var fs = require("fs");
var file = fs.readFileSync("./D6/d6.txt", "utf-8");
// var file = fs.readFileSync("./D6/test.txt", "utf-8");
var rows = file.split("\r\n");

const partOne = (text) => {
  let raceTimes = rows[0].match(/\d+/g).map(Number);
  let distances = rows[1].match(/\d+/g).map(Number);

  let winArr = [];
  // each race find # of ways to win
  for (let i = 0; i < raceTimes.length; i++) {
    let raceTime = raceTimes[i];
    let distance = distances[i];
    let countWins = 0;
    for (let time = 1; time < raceTime; time++) {
      if (time * (raceTime - time) > distance) {
        countWins++;
      }
    }
    winArr.push(countWins);
  }
  // multiply them together for answer
  return winArr.reduce((product, value) => product * value, 1);
};

const partTwo = (text) => {
  let raceTime = rows[0].match(/\d+/g).join("");
  let distance = rows[1].match(/\d+/g).join("");
  let countWins = 0;
  for (let time = 1; time < raceTime; time++) {
    if (time * (raceTime - time) > distance) {
      countWins++;
    }
  }
  return countWins;
};

console.log(`Part One: `, partOne(rows));
console.log(`Part Two: `, partTwo(rows));
