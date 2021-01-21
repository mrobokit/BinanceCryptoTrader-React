import { getHistoricalCandlestickDataWidthAxios } from "../../actions";

//Debug
// var time = parse(1509392160);
// console.log(time);

// Proud of this function
export async function getData() {
  // const dateString = (m) => {
  //   return (
  //     m.getUTCFullYear() +
  //     "-" +
  //     ("0" + (m.getUTCMonth() + 1)).slice(-2) +
  //     "-" +
  //     ("0" + m.getUTCDate()).slice(-2) +
  //     " " +
  //     ("0" + m.getUTCHours()).slice(-2) +
  //     ":" +
  //     ("0" + m.getUTCMinutes()).slice(-2) +
  //     ":" +
  //     ("0" + m.getUTCSeconds()).slice(-2)
  //   );
  // };

  const fetchArrayOfArrays = await getHistoricalCandlestickDataWidthAxios(
    "5m",
    "ETHUSDT"
  );

  const turnArrayOfArraysIntoAnArrayOfObjects = fetchArrayOfArrays.map(
    function (x) {
      return {
        time: x[0] / 1000,
        open: x[1],
        high: x[2],
        low: x[3],
        close: x[4],
        // volume: x[5], - i need to construct a separate object for this, with just the time and volume ( see volumeData.js)
      };
    }
  );

  return turnArrayOfArraysIntoAnArrayOfObjects;
}
