import React, { useContext, useState, useEffect } from "react";
import { context } from "../../../../context/context";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarExpDayGraph from "./BarExpDayGraph";
Chart.register(CategoryScale);

function HistoryExpDayGraph({ day, month, year }) {
  const { state, dispatch } = useContext(context);
  const expensesSummary = [];
  let addedCategories = {};
  const dayExpenses = state.user?.expenses?.filter(
    (exp) =>
      new Date(exp.date).getDate() === new Date(day).getDate() &&
      new Date(exp.date).getMonth() === new Date(day).getMonth() &&
      new Date(exp.date).getFullYear() === new Date(day).getFullYear()
  );
  dayExpenses?.map((exp) => {
    const { amount, category } = exp;
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });
  for (const category in addedCategories) {
    expensesSummary.push({ category, amount: addedCategories[category] });
  }
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Amount Spent ",
        data: [],
        backgroundColor: ["#3e47ed", "#e49ec3", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 0,
        barThickness: 30,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: expensesSummary
        ? expensesSummary.map((expense) => expense?.category)
        : [],
      datasets: [
        {
          label: "Amount Spent ",
          data: expensesSummary?.map((expense) => expense?.amount),
          backgroundColor: [
            "#2a71d0",
            "#35d02a",
            "#d02aa9",
            "#d0a12a",
            "#d02a3b",
            "#2ad0cb",
            "#97dd73",
          ],
          borderColor: "black",
          borderWidth: 0,
          barThickness: 30,
        },
      ],
    });
  }, [day, state.user]);

  return (
    <div>
      {chartData?.datasets[0].data.length > 0 && (
        <BarExpDayGraph chartData={chartData} day={day} />
      )}
    </div>
  );
}

export default HistoryExpDayGraph;
