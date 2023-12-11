var fs = require("fs");
var file = fs.readFileSync("./D8/d8.txt", "utf-8");
// var file = fs.readFileSync("./D8/test.txt", "utf-8");
// var file = fs.readFileSync("./D8/test2.txt", "utf-8");
var rows = file.split("\r\n");

const partOne = (inputs, start, end) => {
  let networkMap = createMap(inputs);

  let steps = getStepsArray(inputs);

  return getGhostSteps(networkMap, steps, start, end);
};

const partTwo = (inputs) => {
  let networkMap = createMap(inputs);
  let steps = getStepsArray(inputs);
  let startNodes = getStartNodes(inputs);
  let startNodesLen = startNodes.length;
  let endNodes = getEndNodes(inputs);
  let endNodesSet = new Set(endNodes);

  let answers = [];
  for (let i = 0; i < startNodesLen; i++) {
    let start = startNodes[i];
    answers.push(getGhostStepsMany(networkMap, steps, start, endNodesSet));
  }
  return lcmArray(answers);
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

const getStepsArray = (inputs) => {
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

const getGhostSteps = (map, steps, start, end) => {
  let count = 0;
  let move = start;
  while (move !== end) {
    for (let step of steps) {
      move = moveCycle(map, move, step);
      count++;
    }
  }
  return count;
};

const getGhostStepsMany = (map, steps, start, endSet) => {
  let count = 0;
  let move = start;
  while (!endSet.has(move)) {
    for (let step of steps) {
      move = moveCycle(map, move, step);
      count++;
    }
  }
  return count;
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

const getStartNodes = (inputs) => {
  let startNodes = [];
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input.match(/^\w{2}A/)) {
      continue;
    }
    let start = input.match(/^\w{2}A/);
    startNodes.push(start[0]);
  }
  return startNodes;
};

const getEndNodes = (inputs) => {
  let endNodes = [];
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    if (!input.match(/^\w{2}Z/)) {
      continue;
    }
    let start = input.match(/^\w{2}Z/);
    endNodes.push(start[0]);
  }
  return endNodes;
};

const gcd = (a, b) => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

const lcmArray = (numbers) => {
  return numbers.reduce((a, b) => lcm(a, b));
};

// console.log(`Part One: `, partOne(rows, "AAA", "ZZZ"));
console.log(`Part Two: `, partTwo(rows));
