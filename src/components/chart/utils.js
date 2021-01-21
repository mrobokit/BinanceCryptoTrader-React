import { timeFormat } from "d3-time-format";
import { getHistoricalCandlestickDataWidthAxios } from "../../actions";

var parse = timeFormat("%Y-%m-%d %H:%M:%S");

//Debug
// var time = parse(1509392160);
// console.log(time);

// Proud of this function
export async function getData() {
  const fetchArrayOfArrays = await getHistoricalCandlestickDataWidthAxios(
    "1m",
    "LINKUSDT"
  );

  const turnArrayOfArraysIntoAnArrayOfObjects = fetchArrayOfArrays.map(
    function (x) {
      return {
        date: new Date(x[0]),
        open: x[1],
        high: x[2],
        low: x[3],
        close: x[4],
        volume: x[5],
      };
    }
  );

  return turnArrayOfArraysIntoAnArrayOfObjects;
}
