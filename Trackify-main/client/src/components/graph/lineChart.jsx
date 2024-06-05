import React from "react";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Expenses for the year",
      backgroundColor: "rgb(33, 150, 243)",
      borderColor: "rgb(33, 150, 243)",
      data: [0, 1000, 5, 450, 5, 700, 45],
    },
  ],
};

const LineChart = () => {
  return (
    <div className="graph-container">
      <Line data={data} />
    </div>
  );
};

export default LineChart;
