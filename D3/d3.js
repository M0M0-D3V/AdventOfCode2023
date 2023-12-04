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

console.log(`Part One: `, partOne(textRows));
