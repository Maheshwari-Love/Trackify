import React, { useContext, useState, useEffect } from "react";
import { context } from "../../../../context/context";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import BarIncDayGraph from "./BarIncDayGraph";

Chart.register(CategoryScale);

function HistoryIncDayGraph({ day }) {
  const { state, dispatch } = useContext(context);
  const incomesSummary = [];
  let addedCategories = {};

  const dayIncomes = state.user?.incomes?.filter(
    (income) =>
      new Date(income.date).getDate() === new Date(day).getDate() &&
      new Date(income.date).getMonth() === new Date(day).getMonth() &&
      new Date(income.date).getFullYear() === new Date(day).getFullYear()
  );

  dayIncomes?.map((income) => {
    const { amount, category } = income;
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });

  for (const category in addedCategories) {
    incomesSummary.push({ category, amount: addedCategories[category] });
  }

  const initialData = {
    labels: [],
    datasets: [
      {
        label: "Amount Earned ",
        data: [],
        backgroundColor: ["#3e47ed", "#e49ec3", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 0,
        barThickness: 30,
      },
    ],
  };

  const [chartData, setChartData] = useState(initialData);

  useEffect(() => {
    setChartData({
      labels: incomesSummary.map((income) => income?.category),
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
          barThickness: 30,
        },
      ],
    });
  }, [day, state.user]);

  return (
    <div>
      {chartData?.datasets[0].data.length > 0 && (
        <BarIncDayGraph chartData={chartData} day={day} />
      )}
    </div>
  );
}

export default HistoryIncDayGraph;
