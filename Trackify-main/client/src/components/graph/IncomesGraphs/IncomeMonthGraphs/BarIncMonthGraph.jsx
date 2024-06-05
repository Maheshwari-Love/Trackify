import React from "react";
import { Bar } from "react-chartjs-2";
import "../../barChartStyle.css";

function BarIncMonthGraph({ chartData, month, monthYear }) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className="chart-container">
      <Bar
        className="barChart"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Incomes of ${months[month]} ${monthYear}`,
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

export default BarIncMonthGraph;
