import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  //   const labels = data.map((entry) => entry.Day);
  //   const values = data.map((entry) => entry.feature);

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        // label: "A",
        // data: values,
        // borderColor: "rgba(75,192,192,1)",
        // borderWidth: 1,
      },
    ],
  };

  return <Line data={lineChartData} />;
};

export default LineChart;
