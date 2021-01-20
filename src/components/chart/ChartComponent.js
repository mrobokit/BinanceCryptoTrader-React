//Chart stuff
import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import { getData } from "./utils";
import { TypeChooser } from "react-stockcharts/lib/helper";

const ChartComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      {data === null ? (
        <div>Loading...</div>
      ) : (
        <TypeChooser>{(type) => <Chart type={type} data={data} />}</TypeChooser>
      )}
    </div>
  );
};

export default ChartComponent;
