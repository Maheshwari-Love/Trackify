import React from "react";
import { Bar } from "react-chartjs-2";
import "../../barChartStyle.css";

function BarIncWeekGraph({ chartData, weekStart, weekLast }) {
  return (
    <div className="chart-container">
      <Bar
        className="barChart"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Incomes of ${new Date(
                weekStart
              ).toLocaleDateString()} - ${new Date(
                weekLast
              ).toLocaleDateString()}`,
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

export default BarIncWeekGraph;
