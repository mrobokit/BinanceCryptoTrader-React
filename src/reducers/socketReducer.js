export const eventSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connectToEvent":
      return action;
    case "connectedToEvent":
      return action;
    case "disconnectFromEvent":
      return action;
    case "disconnectedFromEvent":
      return action;
    case "wipeEvent":
      return action;
    case "eventStream":
      if (action.payload.e === "executionReport") {
        console.log("executionReport", action.payload);
        return { ...state, executionReport: action.payload };
      } else {
        console.log("outbound", action.payload);
        return { ...state, outbound: action.payload };
      }
    default:
      return state;
  }
};
export const tickerSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connectToTicker":
      return action;
    case "connectedToTicker":
      return action;
    case "disconnectFromTicker":
      return action;
    case "disconnectedFromTicker":
      return action;
    case "wipeTicker":
      return action;
    case "tickerStream":
      if (action.payload.s === action.subtype) {
        const name = action.subtype.toLowerCase();
        return { ...state, [name]: action.payload }; // [] is a lifesaver again!
      }
      // if (action.payload.k.s === action.subtype) {
      //   const name = action.payload.k.e;
      //   return { ...state, [name]: action.payload };
      // }
      break;
    default:
      return state;
  }
};
export const tradeSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connectToTrade":
      return action;
    case "connectedToTrade":
      return action;
    case "disconnectFromTrade":
      return action;
    case "disconnectedFromTrade":
      return action;
    case "wipeTrade":
      return action;
    case "tradeStream":
      //Then i take these names from config and gg
      //This shall dynamically create btcusdt, ethusdt etc objects inside tradeStream :)
      if (action.payload.s === action.subtype) {
        const name = action.subtype.toLowerCase();
        return { ...state, [name]: action.payload }; // [] is a lifesaver again!
      }

      break;
    default:
      return state;
  }
};
export const klineSocketReducer = (state = [], action) => {
  switch (action.type) {
    case "connectToKline":
      return action;
    case "connectedToKline":
      return action;
    case "disconnectFromKline":
      return action;
    case "disconnectedFromKline":
      return action;
    case "wipeKline":
      return action;
    case "klineStream":
      //Transform the object into lightweight-charts candlestick compatible format (OHLC)
      if (action.payload.k.e === action.subtype) {
        const candle = action.payload.k;
        const name = candle.s;
        const time = candle.t / 1000;

        return {
          ...state,
          [name + `@kline_${action.payload.k.i}`]: {
            time: time,
            open: candle.o,
            high: candle.h,
            low: candle.l,
            close: candle.c,
          },
        };
      }
      break;
    default:
      return state;
  }
};
