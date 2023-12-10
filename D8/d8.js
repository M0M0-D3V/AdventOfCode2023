var fs = require("fs");
var file = fs.readFileSync("./D8/d8.txt", "utf-8");
// var file = fs.readFileSync("./D8/test.txt", "utf-8");
// var file = fs.readFileSync("./D8/test2.txt", "utf-8");
var rows = file.split("\r\n");

const partOne = (inputs) => {
  let networkMap = createMap(inputs);

  let steps = getStepsArray(inputs);

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
  let networkMap = createMap(inputs);
  let steps = getStepsArray(inputs);
  let stepsLen = steps.length;
  // simultaneously start from nodes that end with A
  let startNodes = getStartNodes(inputs);
  let startNodesLen = startNodes.length;
  let endNodes = getEndNodes(inputs);
  let endNodesSet = new Set(endNodes);
  let count = 0;
  let index = 0;

  while (!startNodes.every((node) => endNodesSet.has(node))) {
    let step = steps[index];
    // track all progressions
    for (let n = 0; n < startNodesLen; n++) {
      let node = startNodes[n];
      startNodes[n] = moveCycle(networkMap, node, step);
    }
    count++;
    if (index < stepsLen - 1) {
      index++;
    } else {
      index = 0;
    }
  }
  // total steps till all end on nodes ending with Z
  return count;
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

// console.log(`Part One: `, partOne(rows));
console.log(`Part Two: `, partTwo(rows));
