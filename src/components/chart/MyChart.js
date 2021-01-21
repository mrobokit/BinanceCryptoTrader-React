import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import "./MyChart.css";
import { getData } from "./utils";
import { useSelector } from "react-redux";

const MyChart = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const config = useSelector((state) => state.config);
  const [oneTime, setOneTime] = useState(true);

  useEffect(() => {
    if (oneTime) {
      setOneTime(false);

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

      const binanceSocket = new WebSocket(
        `wss://stream.binance.com:9443/ws/linkusdt@kline_1m`
      );

      binanceSocket.onmessage = function (event) {
        var message = JSON.parse(event.data);

        var candlestick = message.k;

        //console.log(candlestick);

        candleSeries.update({
          time: candlestick.t / 1000,
          open: candlestick.o,
          high: candlestick.h,
          low: candlestick.l,
          close: candlestick.c,
        });
      };
    }
  }, [config.pair]);

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
      <div className="myChart">
        <div ref={chartContainerRef} className="chart-container" />
      </div>
    </>
  );
};

export default MyChart;
