import React, { useContext, useEffect } from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { context } from "../../../context/context";
import { DoughnutChart } from "./DoughnutChart.jsx";
Chart.register(CategoryScale);

function ExpensesHomeGraph() {
  const { state, dispatch } = useContext(context);
  const expensesSummary = [];
  let addedCategories = {};

  const monthlyExpenses = state.user?.expenses?.filter(
    (exp) =>
      new Date(exp.date).getMonth() === new Date().getMonth() &&
      new Date(exp.date).getFullYear() === new Date().getFullYear()
  );

  monthlyExpenses?.map((exp) => {
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
    options: {
      legend: {
        maxWidth: 10,
      },
    },
  });

  useEffect(() => {
    setChartData({
      labels: expensesSummary?.map(
        (expense) =>
          expense?.category?.charAt(0).toUpperCase() +
          expense?.category.slice(1)
      ),
      datasets: [
        {
          label: "Amount Spent ",
          data: expensesSummary?.map((expense) => expense?.amount),
          backgroundColor: [
            "#86a8d5",
            "#98e693",
            "#eb90d6",
            "#d0a12a",
            "#eee2a6",
            "#2ad0cb",
            "#97dd73",
          ],
          borderColor: "black",
          borderWidth: 0,
        },
      ],
    });
  }, [state.user]);

  return (
    <div>
      <DoughnutChart chartData={chartData} />
    </div>
  );
}

export default ExpensesHomeGraph;
