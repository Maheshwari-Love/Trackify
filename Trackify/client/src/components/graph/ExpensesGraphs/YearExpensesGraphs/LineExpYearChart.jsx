import React from "react";
import { Line } from "react-chartjs-2";

function LineExpYearChart({ chartData, year }) {
  return (
    <div className="chart-container">
      <Line
        className="barChart"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Expenses of ${year}`,
            },
            legend: {
              display: false,
            },
          },
          layout: {
            padding: {
              x: 20,
            },
          },
        }}
      />
    </div>
  );
}

export default LineExpYearChart;
