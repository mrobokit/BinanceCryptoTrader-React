import Chart from "./madalin-react-lightweight-charts";
import React, { Component } from "react";

class MyChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        alignLabels: true,
        timeScale: {
          rightOffset: 12,
          barSpacing: 3,
          fixLeftEdge: true,
          lockVisibleTimeRangeOnResize: true,
          rightBarStaysOnScroll: true,
          borderVisible: false,
          borderColor: "#fff000",
          visible: true,
          timeVisible: true,
          secondsVisible: false,
        },
      },
      candlestickSeries: this.props.candleSticks,
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        candlestickSeries={this.state.candlestickSeries}
        autoWidth
        height={320}
      />
    );
  }
}

export default MyChart;
