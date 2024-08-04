import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../../context/context";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarExpWeekGraph from "./BarExpWeekGraph";
Chart.register(CategoryScale);

function HistoryExpWeekGraph({ weekStart, weekLast }) {
  const { state, dispatch } = useContext(context);
  const expensesSummary = [];
  let addedCategories = {};
  const weeklyExpenses = state.user?.expenses?.filter((exp) => {
    if (new Date(weekStart).getMonth() === new Date(weekLast).getMonth()) {
      return (
        new Date(exp.date).getDate() >= new Date(weekStart).getDate() &&
        new Date(exp.date).getMonth() >= new Date(weekStart).getMonth() &&
        new Date(exp.date).getFullYear() >= new Date(weekStart).getFullYear() &&
        new Date(exp.date).getDate() <= new Date(weekLast).getDate() &&
        new Date(exp.date).getMonth() <= new Date(weekLast).getMonth() &&
        new Date(exp.date).getFullYear() <= new Date(weekLast).getFullYear()
      );
    } else if (new Date(weekStart).getMonth() < new Date(weekLast).getMonth()) {
      return (
        (new Date(exp.date).getDate() >= new Date(weekStart).getDate() &&
          new Date(exp.date).getMonth() >= new Date(weekStart).getMonth() &&
          new Date(exp.date).getFullYear() >=
            new Date(weekStart).getFullYear()) ||
        (new Date(exp.date).getDate() <= new Date(weekLast).getDate() &&
          new Date(exp.date).getMonth() <= new Date(weekLast).getMonth() &&
          new Date(exp.date).getFullYear() <= new Date(weekLast).getFullYear())
      );
    }
  });

  weeklyExpenses?.map((exp) => {
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
    labels: expensesSummary?.map(
      (expense) =>
        expense?.category?.charAt(0).toUpperCase() + expense?.category.slice(1)
    ),
    datasets: [
      {
        label: "Amount Spent ",
        data: expensesSummary?.map((expense) => expense?.amount),
        backgroundColor: ["#3e47ed", "#e49ec3", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 0,
        barThickness: 30,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: expensesSummary?.map((expense) => expense?.category),
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
        },
      ],
    });
  }, [weekStart, weekLast, state.user]);
  return (
    <div>
      <BarExpWeekGraph
        chartData={chartData}
        weekLast={weekLast}
        weekStart={weekStart}
      />
    </div>
  );
}

export default HistoryExpWeekGraph;
