import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import "./MyChart.css";
import { useDispatch, useSelector } from "react-redux";
import FluidPlaceholder from "../semantic/FluidPlaceholder";
import {
  getHistoricalCandlestickDataWidthAxios,
  storeCandleStreamNoReload,
} from "../../actions";

// import { heikinAshi } from "./heikinAshi";

const MyChart = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  // const resizeObserver = useRef();

  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  var candleSeries;

  const getData = async () => {
    const fetchArrayOfArrays = await getHistoricalCandlestickDataWidthAxios(
      "1m",
      `${config.pair}`
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
  };

  useEffect(() => {
    const binanceSocket = new WebSocket(
      `wss://stream.binance.com:9443/ws/${config.pair.toLowerCase()}@kline_1m`
    );

    const run = async () => {
      const ress = await getData();
      dispatch(storeCandleStreamNoReload(true));

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
          // secondsVisible: false,
          // fixLeftEdge: true,
          //   borderVisible: false,
          // lockVisibleTimeRangeOnResize: true,
          rightOffset: 30,
          barSpacing: 11,
        },
        priceScale: {
          borderColor: "#485c7b",
          //   position: "left",
          //   mode: 2,
          //   invertScale: true,
          //   alignLabels: false,
          //   borderVisible: false,
          //   borderColor: "#555ffd",
          //   scaleMargins: {
          //     top: 0.3,
          //     bottom: 0.25,
          //   },
        },
        watermark: {
          color: "white",
          visible: true,
          text: `${config.pair}`,
          fontSize: 18,
          horzAlign: "left",
          vertAlign: "top",
        },
      });

      // eslint-disable-next-line react-hooks/exhaustive-deps
      candleSeries = chart.current.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });

      candleSeries.setData(ress);

      binanceSocket.onmessage = function (event) {
        var message = JSON.parse(event.data);

        var candlestick = message.k;

        //console.log(candlestick);

        // const heikin = heikinAshi(
        //   [
        //     {
        //       time: candlestick.t / 1000,
        //       open: candlestick.o,
        //       high: candlestick.h,
        //       low: candlestick.l,
        //       close: candlestick.c,
        //     },
        //   ],
        //   {
        //     overWrite: true, //overwrites the original data or create a new array
        //     formatNumbers: false, //formats the numbers and reduces their significant digits based on the values
        //     decimals: 4, //number of significant digits
        //     forceExactDecimals: false, //force the number of significant digits or reduce them if the number is high
        //   }
        // );
        // candleSeries.update(heikin[0]);

        candleSeries.update({
          time: candlestick.t / 1000,
          open: candlestick.o,
          high: candlestick.h,
          low: candlestick.l,
          close: candlestick.c,
        });
      };

      binanceSocket.onopen = () => {
        console.log("Candlestick Stream open.");
      };
      binanceSocket.onclose = () => {
        console.log("Candlestick Stream closed");
      };
    };

    run();

    return () => {
      binanceSocket.close();
      dispatch(storeCandleStreamNoReload(false));
      if (chart) chart?.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.pair]);

  // Resize chart on container resizes.
  // useEffect(() => {
  //   if (config.candleStreamNoReload === true) {
  //     // check here for bugs
  //     resizeObserver.current = new ResizeObserver((entries) => {
  //       const { width, height } = entries[0].contentRect;
  //       chart.current.applyOptions({ width, height });
  //       setTimeout(() => {
  //         chart.current.timeScale().fitContent();
  //       }, 0);
  //     });

  //     resizeObserver.current.observe(chartContainerRef.current);

  //     return () => resizeObserver.current.disconnect();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {config.candleStreamNoReload === true ? (
        <div className="myChart">
          <div ref={chartContainerRef} className="chart-container" />
        </div>
      ) : (
        <FluidPlaceholder />
      )}
    </>
  );
};

export default MyChart;
