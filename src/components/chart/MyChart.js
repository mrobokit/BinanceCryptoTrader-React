import React, { useEffect, useRef, useState } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import { priceData } from "./priceData";
import { volumeData } from "./volumeData";
import { areaData } from "./areaData";
import { newData } from "./newData";
import "./MyChart.css";

import { getData } from "./utils";

const MyChart = () => {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const [init, setInit] = useState(true);

  const [myData, setMyData] = useState([]);

  useEffect(() => {
    if (init) {
      setInit(false);

      getData().then((data) => {
        //   console.log(data);
        setMyData(data);
      });

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
        priceScale: {
          borderColor: "#485c7b",
        },
        timeScale: {
          borderColor: "#485c7b",
        },
      });

      //console.log(chart.current);

      const candleSeries = chart.current.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });
      //candleSeries.setData(myData);
      candleSeries.setData(newData);
      //   candleSeries.update({
      //     time: "2019-09-30",
      //     open: "1.67480000",
      //     high: "1.74920000",
      //     low: "1.64410000",
      //     close: "2.10020000",
      //   }); - this is how you update data

      //console.log(candleSeries);
    }

    // chart.current.updateData({
    //   time: "2019-09-10",
    //   open: "1.88830000",
    //   high: "1.93260000",
    //   low: "1.87300000",
    //   close: "1.89980000",
    // });

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

    console.clear();
    console.log(chart.current);

    //Available Proto Functions
    //chart.current.removeSeries(volumeSeries);
    // console.log(chart.current); - Reference to my DOM object i can interact with
    // candleSeries.setData(newData); -
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
      <div className="myChart">
        <div ref={chartContainerRef} className="chart-container" />
      </div>
    </>
  );
};

export default MyChart;
