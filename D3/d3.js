var fs = require("fs");
var text = fs.readFileSync("./D3/d3.txt", "utf-8");
// var text = fs.readFileSync("./D3/test.txt", "utf-8");
var [...textRows] = text.split("\r\n");

const partOne = (rows) => {
  let symbols = ["@", "#", "$", "%", "&", "*", "-", "=", "+", "/"];
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];

    for (let char = 0; char < row.length; char++) {
      if (!isNaN(row[char])) {
        let num = row.substring(char).match(/\d+/);
        let partNum = parseInt(num[0]);
        let c = row[char];
        // is there an up?
        if (i > 0) {
          if (
            symbols.some((symbol) =>
              rows[i - 1].slice(char, char + num[0].length).includes(symbol)
            )
          ) {
            sum += partNum;
            partNum = 0;
          }
          // top left
          if (char - 1 > 0 && symbols.includes(rows[i - 1][char - 1])) {
            sum += partNum;
            partNum = 0;
          }
          // top right
          if (
            char + num[0].length < row.length &&
            symbols.includes(rows[i - 1][char + num[0].length])
          ) {
            sum += partNum;
            partNum = 0;
          }
        }

        // is there a down?
        if (i < rows.length - 1) {
          if (
            symbols.some((symbol) =>
              rows[i + 1].slice(char, char + num[0].length).includes(symbol)
            )
          ) {
            sum += partNum;
            partNum = 0;
          }
          // bottom left
          if (char - 1 > 0 && symbols.includes(rows[i + 1][char - 1])) {
            sum += partNum;
            partNum = 0;
          }
          // bottom right
          if (
            char + num[0].length < row.length &&
            symbols.includes(rows[i + 1][char + num[0].length])
          ) {
            sum += partNum;
            partNum = 0;
          }
        }
        // left
        if (char - 1 > 0 && symbols.includes(rows[i][char - 1])) {
          sum += partNum;
          partNum = 0;
        }
        // right
        if (
          char + num[0].length < row.length &&
          symbols.includes(rows[i][char + num[0].length])
        ) {
          sum += partNum;
          partNum = 0;
        }
        char += num[0].length;
      }
    }
  }
  return sum;
};

const partTwo = (rows) => {
  let gearMap = new Map();
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];

    for (let c = 0; c < row.length; c++) {
      let char = row[c];

      if (!isNaN(char)) {
        let num = row.substring(c).match(/\d+/);
        let partNum = parseInt(num[0]);
        // is there an up?
        if (i > 0) {
          let match = rows[i - 1].slice(c, c + num[0].length).match(/\*/);
          if (match) {
            let pos = `${i - 1}, ${c + match.index}`;
            checkPosAndAddPartNumToMap(gearMap, pos, partNum);
          }
          // top left
          if (c - 1 > 0 && rows[i - 1][c - 1] == "*") {
            let pos = `${i - 1}, ${c - 1}`;
            checkPosAndAddPartNumToMap(gearMap, pos, partNum);
          }
          // top right
          if (
            c + num[0].length < row.length &&
            rows[i - 1][c + num[0].length] == "*"
          ) {
            let pos = `${i - 1}, ${c + num[0].length}`;
            checkPosAndAddPartNumToMap(gearMap, pos, partNum);
          }
        }

        // is there a down?
        if (i < rows.length - 1) {
          let match = rows[i + 1].slice(c, c + num[0].length).match(/\*/);
          if (match) {
            let pos = `${i + 1}, ${c + match.index}`;
            checkPosAndAddPartNumToMap(gearMap, pos, partNum);
          }
          // bottom left
          if (c - 1 > 0 && rows[i + 1][c - 1] == "*") {
            let pos = `${i + 1}, ${c - 1}`;
            checkPosAndAddPartNumToMap(gearMap, pos, partNum);
          }
          // bottom right
          if (
            c + num[0].length < row.length &&
            rows[i + 1][c + num[0].length] == "*"
          ) {
            let pos = `${i + 1}, ${c + num[0].length}`;
            checkPosAndAddPartNumToMap(gearMap, pos, partNum);
          }
        }
        // left
        if (c - 1 > 0 && rows[i][c - 1] == "*") {
          let pos = `${i}, ${c - 1}`;
          checkPosAndAddPartNumToMap(gearMap, pos, partNum);
        }
        // // right
        if (
          c + num[0].length < row.length &&
          rows[i][c + num[0].length] == "*"
        ) {
          let pos = `${i}, ${c + num[0].length}`;
          checkPosAndAddPartNumToMap(gearMap, pos, partNum);
        }
        c += num[0].length;
      }
    }
  }
  console.log(gearMap);
  gearMap.forEach((arr) => {
    arr.length == 2 ? (sum += arr[0] * arr[1]) : "";
  });
  return sum;
};

const checkPosAndAddPartNumToMap = (map, pos, partNum) => {
  if (map.has(pos)) {
    let get = map.get(pos);
    get.push(partNum);
  } else {
    map.set(pos, [partNum]);
  }
};

console.log(`Part One: `, partOne(textRows));
console.log(`Part Two: `, partTwo(textRows));
