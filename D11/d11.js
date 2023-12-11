var fs = require("fs");
// var file = fs.readFileSync("./D11/d11.txt", "utf-8");
var file = fs.readFileSync("./D11/test.txt", "utf-8");
// var file = fs.readFileSync("./D11/test2.txt", "utf-8");
var rows = file.split("\r\n");
