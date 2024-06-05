import React, { useContext, useEffect, useState } from "react";
import { context } from "../../../../context/context";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarIncMonthGraph from "./BarIncMonthGraph";

Chart.register(CategoryScale);

function HistoryIncMonthGraph({ month, monthYear }) {
  const { state, dispatch } = useContext(context);
  const incomesSummary = [];
  let addedCategories = {};

  const monthlyIncomes = state.user?.incomes?.filter(
    (exp) =>
      new Date(exp.date).getMonth() === month &&
      new Date(exp.date).getFullYear() === monthYear
  );

  monthlyIncomes?.map((exp) => {
    const { amount, category } = exp;
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });

  for (const category in addedCategories) {
    incomesSummary.push({ category, amount: addedCategories[category] });
  }

  const [chartData, setChartData] = useState({
    labels: incomesSummary?.map(
      (inc) => inc?.category?.charAt(0).toUpperCase() + inc?.category.slice(1)
    ),
    datasets: [
      {
        label: "Amount Earned ",
        data: incomesSummary?.map((income) => income?.amount),
        backgroundColor: ["#3e47ed", "#e49ec3", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 0,
        barThickness: 30,
      },
    ],
  });

  useEffect(() => {
    setChartData({
      labels: incomesSummary?.map((income) => income?.category),
      datasets: [
        {
          label: "Amount Earned ",
          data: incomesSummary?.map((income) => income?.amount),
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
  }, [monthYear, month, state.user]);
  return (
    <div>
      <BarIncMonthGraph
        chartData={chartData}
        month={month}
        monthYear={monthYear}
      />
    </div>
  );
}

export default HistoryIncMonthGraph;
