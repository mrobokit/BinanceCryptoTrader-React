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
  const [klineTicker, setKLineTicker] = useState(null);
  const [onceOnly, setOnceOnly] = useState(false);

  const kline = useSelector(
    (state) => state.klineStream.kline?.k,
    shallowEqual
  );
  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  const connectToKlineStream = () => {
    dispatch(
      connectToKline(
        `wss://stream.binance.com:9443/ws/linkusdt@kline_1m`,
        storeKlineStream
      )
    );
  };

  const klineStreamObjectIntoModifiedObectIntoArrayOfObjectsChartData = () => {
    // Must take the JSON object and return it as an array with only the specified options
    //console.log(kline);
    if (kline) {
      return {
        date: new Date(kline.t),
        open: kline.o,
        high: kline.h,
        low: kline.l,
        close: kline.c,
        volume: kline.v,
      };
    }
  };

  useEffect(() => {
    if (config.klineStatus === false) {
      dispatch(storeKlineStatus(true));
      connectToKlineStream();

      getData().then((data) => {
        setKLineTicker(data);
        console.log(data);
      });
    }

    if (kline) {
      setKLineTicker((oldArray) => [
        ...oldArray,
        klineStreamObjectIntoModifiedObectIntoArrayOfObjectsChartData(),
      ]);
    }
  }, []); //kline

  return (
    <div>
      {klineTicker === null ? (
        <div>Loading...</div>
      ) : (
        <TypeChooser>
          {(type) => <Chart type={type} data={klineTicker} />}
        </TypeChooser>
      )}
    </div>
  );
};

export default ChartComponent;
