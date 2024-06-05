import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../../context/context";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineIncYearGraph from "./LineIncYearGraph";

Chart.register(CategoryScale);

function HistoryIncYearGraph({ year }) {
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
  const incomesSummary = [];
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

  state.user?.incomes?.map((inc) => {
    const { amount } = inc;
    for (let i = 0; i < months.length; i++) {
      if (
        new Date(inc.date).getMonth() === i &&
        new Date(inc.date).getFullYear() === year
      ) {
        addedCategories[months[i]] = addedCategories[months[i]] + amount;
      }
    }
  });

  for (const month in addedCategories) {
    incomesSummary.push({ month, amount: addedCategories[month] });
  }

  const [chartData, setChartData] = useState({
    labels: months?.map((month) => month),
    datasets: [
      {
        label: "Amount Earned ",
        data: incomesSummary?.map((income) => income?.amount),
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
          label: "Amount Earned ",
          data: incomesSummary?.map((income) => income?.amount),
          backgroundColor: ["#b8f6f6"],
          fill: true,
          borderColor: "rgb(75, 184, 192)",
          borderWidth: 2,
        },
      ],
    });
  }, [year, state.user]);

  return (
    <div>
      <LineIncYearGraph chartData={chartData} year={year} />
    </div>
  );
}

export default HistoryIncYearGraph;
