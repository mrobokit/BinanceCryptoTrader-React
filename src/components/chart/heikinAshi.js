function formatNumbersFunc(value, decimals = 4, forceExactDecimals = false) {
  let maxDecimals = 8;
  try {
    if (!value) {
      return value;
    }

    if (!isNaN(value)) {
      value = parseFloat(value);
    }
    if (forceExactDecimals) {
      return parseFloat(value.toFixed(decimals));
    }

    if (value < 1) {
      return parseFloat(value.toFixed(maxDecimals));
    } else if (value > 1000) {
      decimals = 0;
    } else if (value > 100) {
      decimals = 2;
    }

    return parseFloat(value.toFixed(decimals));
  } catch (error) {
    console.log("value: ", JSON.stringify(value));
    console.log("FixNumberPipe Error: ", error);
  }
}

export const heikinAshi = (
  ohlc,
  options = {
    overWrite: false,
    formatNumbers: false,
    decimals: 4,
    forceExactDecimals: false,
  }
) => {
  let overWrite = options.overWrite || false;
  let formatNumbers = options.formatNumbers || false;
  let decimals = options.decimals || 4;
  let forceExactDecimals = options.forceExactDecimals || false;

  if (!ohlc || ohlc.length === 0) {
    return [];
  }

  let result = [];

  for (let i = 0; i < ohlc.length; i++) {
    const element = ohlc[i];

    let haCandle;
    if (overWrite) {
      haCandle = element;
    } else {
      haCandle = JSON.parse(JSON.stringify(element));
    }
    haCandle.close =
      element.open + element.high + element.low + element.close / 4;
    if (formatNumbers) {
      haCandle.close = formatNumbersFunc(
        haCandle.close,
        decimals,
        forceExactDecimals
      );
    }

    if (i > 0) {
      const result_1 = result[i - 1];
      haCandle.open = (result_1.open + result_1.close) / 2;
      if (formatNumbers) {
        haCandle.open = formatNumbersFunc(
          haCandle.open,
          decimals,
          forceExactDecimals
        );
      }
      haCandle.high = Math.max(element.high, haCandle.open, haCandle.close);
      haCandle.low = Math.min(element.low, haCandle.open, haCandle.close);
    }
    result.push(haCandle);
  }
  return result;
};
