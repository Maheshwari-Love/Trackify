import { Doughnut } from "react-chartjs-2";
import "./homegraph.css";

export const DoughnutChart = ({ chartData }) => {
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
    <div className="home-chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: true,
              maxWidth: 10,

              labels: {
                font: {
                  size: 10,
                },
              },
              position: "bottom",
              align: "center",
            },
          },
        }}
      />
    </div>
  );
};
