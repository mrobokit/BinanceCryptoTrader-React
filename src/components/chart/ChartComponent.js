//Chart stuff
import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import { getData } from "./utils";
import { TypeChooser } from "react-stockcharts/lib/helper";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  connectToKline,
  storeKlineStream,
  storeKlineStatus,
} from "../../actions";

const ChartComponent = () => {
  const [historicalData, setHistoricalData] = useState(null);
  // const [klineTicker, setKLineTicker] = useState(null);
  const [onceOnly, setOnceOnly] = useState(false);

  const kline = useSelector((state) => state.klineStream.kline, shallowEqual);
  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const connectToKlineStream = () => {
    dispatch(
      connectToKline(
        `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@kline_5m`,
        storeKlineStream
      )
    );
  };

  useEffect(() => {
    if (config.klineStatus === false) {
      dispatch(storeKlineStatus(true));
      connectToKlineStream();
    }

    getData().then((data) => {
      console.log(data);
      setHistoricalData(data); // to this i must write the incoming kline stream. Rerendering it and keeping same data in !
    });

    // if (onceOnly === false) {
    //   setOnceOnly(true);

    //   getData().then((data) => {
    //     console.log(data);
    //     setHistoricalData(data); // to this i must write the incoming kline stream. Rerendering it and keeping same data in !
    //   });
    // }

    //setHistoricalData(...historicalData, klineTicker);
  }, [kline]); //kline

  return (
    <div>
      {historicalData === null ? (
        <div>Loading...</div>
      ) : (
        <TypeChooser>
          {(type) => <Chart type={type} data={historicalData} />}
        </TypeChooser>
      )}
    </div>
  );
};

export default ChartComponent;
