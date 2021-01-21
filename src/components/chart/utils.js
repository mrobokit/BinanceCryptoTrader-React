import { getHistoricalCandlestickDataWidthAxios } from "../../actions";

//Debug
// var time = parse(1509392160);
// console.log(time);

// Proud of this function
export async function getData() {
  const dateString = (m) => {
    return (
      m.getUTCFullYear() +
      "-" +
      ("0" + (m.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("0" + m.getUTCDate()).slice(-2)
    );
  };

  const fetchArrayOfArrays = await getHistoricalCandlestickDataWidthAxios(
    "1m",
    "LINKUSDT"
  );

  const turnArrayOfArraysIntoAnArrayOfObjects = fetchArrayOfArrays.map(
    function (x) {
      return {
        time: dateString(new Date(x[0])),
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
