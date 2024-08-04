import React from "react";
import { Bar } from "react-chartjs-2";
import '../../barChartStyle.css'
function BarExpDayGraph({ chartData, day}) {
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
       className='barChart'
       data={chartData?chartData:[]}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Expenses of ${new Date(day).getDate()} ${
                months[new Date(day).getMonth()]
              } ${new Date(day).getFullYear()}`,
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

export default BarExpDayGraph;
