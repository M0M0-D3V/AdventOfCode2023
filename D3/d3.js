var fs = require("fs");
// var text = fs.readFileSync("./D3/d3.txt", "utf-8");
var text = fs.readFileSync("./D3/test.txt", "utf-8");
var [...textRows] = text.split("\r\n");

const partOne = (rows) => {
  let symbols = "@#$%&*-=+/";
  let sum = 0;

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    for (let char = 0; char < row.length; char++) {
      if (!isNaN(row[char])) {
        let num = row.substring(char).match(/\d+/);
        let partNum = parseInt(num[0]);
        if (
          // right
          symbols.includes(row[char - 1]) ||
          // left
          symbols.includes(
            row[char + num.length] ||
              // down
              symbols.includes(rows[i + 1][char])
          )
        ) {
          sum += partNum;
        }
        // up
        // up right
        // down right
        // down left
        // up left
        i += num[0].length;
      }
    }
  }
  return sum;
};

console.log(`Part One: `, partOne(textRows));
