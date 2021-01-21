import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./priceData";
import { volumeData } from "./volumeData";
import { areaData } from "./areaData";
import { newData } from "./newData";
import "./MyChart.css";

import { getData } from "./utils";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import {
  connectToKline,
  storeKlineStream,
  storeKlineStatus,
} from "../../actions";

var candleSeries;

const MyChart = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const [init, setInit] = useState(true);

  // kline stuff
  const config = useSelector((state) => state.config);

  const kline = useSelector(
    (state) => state.klineStream[`${config.pair}@kline_5m`]
  );
  //   const [histPlusCurrent, setHistPlusCurrent] = useState(kline);

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
    //   dispatch(storeKlineStatus(true));
    //   connectToKlineStream();
    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "#334158",
        },
        horzLines: {
          color: "#334158",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        borderColor: "#485c7b",
        timeVisible: true, // shows the minutes and secconds <3
        secondsVisible: false,
        //   fixLeftEdge: true,
        //   borderVisible: false,
        //   lockVisibleTimeRangeOnResize: true,
      },
      priceScale: {
        borderColor: "#485c7b",
        //   position: "left",
        //   mode: 2,
        //   autoScale: false,
        //   invertScale: true,
        //   alignLabels: false,
        //   borderVisible: false,
        //   borderColor: "#555ffd",
        //   scaleMargins: {
        //     top: 0.3,
        //     bottom: 0.25,
        //   },
      },
    });

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    getData().then((response) => {
      candleSeries.setData(response);
    });

    //Making it local as i don't need it elsewhere ( for now )
    const binanceSocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${config.pair?.toLowerCase()}@kline_5m`
    );

    binanceSocket.onmessage = function (event) {
      var message = JSON.parse(event.data);

      var candlestick = message.k;

      console.log(candlestick);

      candleSeries.update({
        time: candlestick.t / 1000,
        open: candlestick.o,
        high: candlestick.h,
        low: candlestick.l,
        close: candlestick.c,
      });
    };

    //candleSeries.setData(myData);
    //candleSeries.setData(newData);

    //   candleSeries.update({
    //     time: "2019-09-30",
    //     open: "1.67480000",
    //     high: "1.74920000",
    //     low: "1.64410000",
    //     close: "2.10020000",
    //   }); - this is how you update data

    //console.log(candleSeries);

    //   setInterval(() => {
    //     //candleSeries.update(kline);

    //     console.log(candleSeries);
    //     console.log(kline);
    //   }, 2200);

    // console.log(candleSeries);
    // console.log(histPlusCurrent);

    //candleSeries.update({ kline });

    //candleSeries.update(kline);

    //candleSeries.setData(newData);
    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: "rgba(38,198,218, 0.56)",
    //   bottomColor: "rgba(38,198,218, 0.04)",
    //   lineColor: "rgba(38,198,218, 1)",
    //   lineWidth: 2,
    // });

    // areaSeries.setData(areaData);

    // const volumeSeries = chart.current.addHistogramSeries({
    //   color: "#182233",
    //   lineWidth: 2,
    //   priceFormat: {
    //     type: "volume",
    //   },
    //   overlay: true,
    //   scaleMargins: {
    //     top: 0.8,
    //     bottom: 0,
    //   },
    // });

    // volumeSeries.setData(volumeData);

    // console.clear();
    // console.log(chart.current);

    //Available Proto Functions
    //chart.current.removeSeries(volumeSeries);
    // console.log(chart.current); - Reference to my DOM object i can interact with
    // candleSeries.setData(newData); - sets data for the first time
    //   candleSeries.update({
    //     time: "2019-09-30",
    //     open: "1.67480000",
    //     high: "1.74920000",
    //     low: "1.64410000",
    //     close: "2.10020000",
    //   }); - this is how you update data
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  return (
    <>
      {/* {console.log(kline)} */}
      <div className="myChart">
        <div ref={chartContainerRef} className="chart-container" />

        <button onClick={() => console.log(candleSeries)}>Click me</button>
      </div>
    </>
  );
};

export default MyChart;
