var fs = require("fs");
var text = fs.readFileSync("./D2/d2.txt", "utf-8");
// var text = fs.readFileSync("./D2/test.txt", "utf-8");
var [...textArr] = text.split("\r\n");

/*
 *Determine which games are possible if the bag had been loaded with only 12 red, 13 green, and 14 blue cubes
 **What is the sum of the IDs of those games?
 */

const partOne = (inputs) => {
  let sum = 0;
  let rowNum = 1;

  for (let row of inputs) {
    let possible = true;
    let green = row.matchAll(/(\d+)[\s]green/g);
    let blue = row.matchAll(/(\d+)[\s]blue/g);
    let red = row.matchAll(/(\d+)[\s]red/g);

    for (cube of green) {
      if (cube[1] > 13) {
        possible = false;
        break;
      }
    }
    for (cube of blue) {
      if (cube[1] > 14) {
        possible = false;
        break;
      }
    }
    for (cube of red) {
      if (cube[1] > 12) {
        possible = false;
        break;
      }
    }
    if (possible) {
      sum += rowNum;
    }
    rowNum++;
  }
  return sum;
};

/*
Part2 - For each game, find the minimum set of cubes that must have been present. What is the sum of the pwoer of these sets?
*/
const partTwo = (inputs) => {
  let sum = 0;

  for (let row of inputs) {
    let pow = 0;
    let green = row.matchAll(/(\d+)[\s]green/g);
    let blue = row.matchAll(/(\d+)[\s]blue/g);
    let red = row.matchAll(/(\d+)[\s]red/g);
    let greenMin = 0;
    let blueMin = 0;
    let redMin = 0;

    for (cube of green) {
      if (parseInt(cube[1]) > greenMin) {
        greenMin = cube[1];
      }
    }
    for (cube of blue) {
      if (parseInt(cube[1]) > blueMin) {
        blueMin = cube[1];
      }
    }
    for (cube of red) {
      if (parseInt(cube[1]) > redMin) {
        redMin = cube[1];
      }
    }
    pow = greenMin * blueMin * redMin;
    sum += pow;
  }
  return sum;
};

// console.log(`Part One: `, partOne(textArr));
console.log(`Part Two: `, partTwo(textArr));
