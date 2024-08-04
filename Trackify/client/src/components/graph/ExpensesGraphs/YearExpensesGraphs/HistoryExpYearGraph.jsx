import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../../context/context";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineExpYearChart from "./LineExpYearChart";
Chart.register(CategoryScale);

function HistoryExpYearGraph({ year }) {
  const { state, dispatch } = useContext(context);
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
  const expensesSummary = [];
  let addedCategories = {
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  };

  state.user?.expenses?.map((exp) => {
    const { amount } = exp;
    for (let i = 0; i < months.length; i++) {
      if (
        new Date(exp.date).getMonth() === i &&
        new Date(exp.date).getFullYear() === year
      ) {
        addedCategories[months[i]] = addedCategories[months[i]] + amount;
      }
    }
  });

  for (const month in addedCategories) {
    expensesSummary.push({ month, amount: addedCategories[month] });
  }

  const [chartData, setChartData] = useState({
    labels: months?.map((month) => month),
    datasets: [
      {
        label: "Amount Spent ",
        data: expensesSummary?.map((expense) => expense?.amount),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#d5c18e",
          "#89a0be",
        ],
        borderColor: "blue",
        borderWidth: 1,
        barThickness: 30,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: months?.map((month) => month),
      datasets: [
        {
          label: "Amount Spent ",
          data: expensesSummary?.map((expense) => expense?.amount),
          backgroundColor: ["#d9abbac9"],
          fill: true,
          borderColor: "#c63968",
          borderWidth: 2,
        },
      ],
    });
  }, [year, state.user]);

  return (
    <div>
      <LineExpYearChart chartData={chartData} year={year} />
    </div>
  );
}

export default HistoryExpYearGraph;
