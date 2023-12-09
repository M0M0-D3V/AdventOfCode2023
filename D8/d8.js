var fs = require("fs");
var file = fs.readFileSync("./D8/d8.txt", "utf-8");
// var file = fs.readFileSync("./D8/test.txt", "utf-8");
var rows = file.split("\r\n");

const partOne = (inputs) => {
  let networkMap = createMap(inputs);

  let steps = readSteps(inputs);

  let count = 0;
  let move = "AAA";
  while (move !== "ZZZ") {
    for (let step of steps) {
      move = moveCycle(networkMap, move, step);
      count++;
    }
  }

  return count;
};

const partTwo = (inputs) => {
  return 0;
};

const createMap = (inputs) => {
  let inputMap = new Map();
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    let mapItems = input.match(/(\w{3})/g);
    if (mapItems != null) {
      inputMap.set(mapItems[0], { left: mapItems[1], right: mapItems[2] });
    }
  }
  return inputMap;
};

const readSteps = (inputs) => {
  let steps;
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input.length) {
      break;
    }
    steps = input
      .match(/^(\w+)[\s]*/g)
      .join("")
      .split("");
  }
  return steps;
};

const moveCycle = (map, key, dir) => {
  let thisMap = map.get(key);
  if (dir === "L") {
    return thisMap.left;
  }
  if (dir === "R") {
    return thisMap.right;
  }
};

// console.log(`Part One: `, partOne(rows));
console.log(`Part Two: `, partTwo(rows));
