var fs = require("fs");
var file = fs.readFileSync("./D5/d5.txt", "utf-8");
// var file = fs.readFileSync("./D5/test.txt", "utf-8");

const partOne = (text) => {
  // get seeds
  let seedsArr = text
    .slice(text.indexOf("seeds:"), text.indexOf("seed-"))
    .match(/\d+/g)
    .map((num) => Number(num));

  let seedMap = createA2BMap("seed-", "soil-", text);

  let soilMap = createA2BMap("soil-", "fertilizer-", text);

  let fertilizerMap = createA2BMap("fertilizer-", "water-", text);

  let waterMap = createA2BMap("water-", "light-", text);

  let lightMap = createA2BMap("light-", "temperature-", text);

  let temperatureMap = createA2BMap("temperature-", "humidity-", text);

  let humidityMap = text
    .slice(text.indexOf("humidity-"))
    .match(/\d+/g)
    .map((num) => Number(num))
    .reduce((result, value, index) => {
      if (index % 3 === 0) {
        result.push([]);
      }
      result[result.length - 1].push(Number(value));
      return result;
    }, []);

  // for each seed track through each map
  let locations = [];
  for (let seed of seedsArr) {
    // seed-to-soil
    let soil = findCorrespondingMap(seedMap, seed);
    // soil-to-fertilizer
    let fertilizer = findCorrespondingMap(soilMap, soil);
    // fertilizer-to-water
    let water = findCorrespondingMap(fertilizerMap, fertilizer);
    // water-to-light
    let light = findCorrespondingMap(waterMap, water);
    // light-to-temperature
    let temperature = findCorrespondingMap(lightMap, light);
    // temperature-to-humidity
    let humidity = findCorrespondingMap(temperatureMap, temperature);
    // humidity-to-location
    let location = findCorrespondingMap(humidityMap, humidity);
    //save
    locations.push(location);
  }
  return Math.min(...locations);
};

const createA2BMap = (start, end, text) => {
  return text
    .slice(text.indexOf(start), text.indexOf(end))
    .match(/\d+/g)
    .map((num) => Number(num))
    .reduce((result, value, index) => {
      if (index % 3 === 0) {
        result.push([]);
      }
      result[result.length - 1].push(Number(value));
      return result;
    }, []);
};

const findCorrespondingMap = (mapRows, src) => {
  // map pattern => [0] destination [1] source [2] range
  for (let i = 0; i < mapRows.length; i++) {
    let row = mapRows[i];
    if (src >= row[1] && src <= row[1] + row[2]) {
      let diff = Math.abs(row[1] - row[0]);
      if (row[1] < row[0]) {
        return src + diff;
      } else {
        return src - diff;
      }
    }
  }
  return src;
};

console.log(`part one: `, partOne(file));
