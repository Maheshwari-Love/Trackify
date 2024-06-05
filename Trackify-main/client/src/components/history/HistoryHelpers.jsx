export const months = [
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

export const summariseExpenses = (filterExpenses) => {
  const expensesSummary = [];
  let addedCategories = {};
  filterExpenses?.map((exp) => {
    const { category, amount, date } = exp;
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });
  for (const category in addedCategories) {
    expensesSummary.push({ category, amount: addedCategories[category] });
  }
  return expensesSummary;
};

export const summariseIncomes = (filterIncomes) => {
  const incomesSummary = [];
  let addedCategories = {};
  filterIncomes?.map((inc) => {
    const { category, amount, date } = inc;
    if (addedCategories[category]) {
      addedCategories[category] += amount;
    } else {
      addedCategories[category] = amount;
    }
  });
  for (const category in addedCategories) {
    incomesSummary.push({ category, amount: addedCategories[category] });
  }
  return incomesSummary;
};

export const setToStartOfWeek = (date) => {
  return new Date(
    date.setDate(date.getDate() - date.getDay() + (date.getDay() > 0 ? 1 : -6))
  );
};

export const setToEndOfWeek = (date) => {
  return new Date(date.setDate(date.getDate() + 6));
};
