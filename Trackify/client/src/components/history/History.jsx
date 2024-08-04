import React, { useContext, useState, useEffect } from "react";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";
import { context } from "../../context/context";
import "./history.css";
import BASE_URL from "../../config/urlConfig";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import HistoryExpMainGraph from "../graph/ExpensesGraphs/ExpensesMainGraph/HistoryExpMainGraph";
import IncomeMainGraph from "../graph/IncomesGraphs/IncomeMainGraph/IncomeMainGraph";
import {
  months,
  setToEndOfWeek,
  setToStartOfWeek,
  summariseExpenses,
  summariseIncomes,
} from "./HistoryHelpers";

function History() {
  const { state, dispatch } = useContext(context);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filteredIncomes, setFilteredIncomes] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [monthYear, setMonthYear] = useState(new Date().getFullYear());
  const [calDate, setCalDate] = useState(new Date());
  const [recieptCategory, setRecieptCategory] = useState("");
  const [weekDay, setWeekDay] = useState(new Date());
  const [weekStart, setWeekStart] = useState(
    new Date(
      weekDay.setDate(
        weekDay.getDate() - weekDay.getDay() + (weekDay.getDay() > 0 ? 1 : -6)
      )
    )
  );
  const [weekLast, setWeekLast] = useState(
    new Date(weekDay.setDate(weekStart.getDate() + 6))
  );
  const [isRecieptView, setIsRecieptView] = useState(false);
  const [recieptUrl, setRecieptUrl] = useState("");
  const [recieptDate, setRecieptDate] = useState(null);
  const curr = state.user?.currency?.slice(3);

  const getUserById = async () => {
    try {
      const token = localStorage.getItem("token");
      if (state.user) {
        const response = await fetch(
          `${BASE_URL}/api/users/getUserById/${state.user?._id}`,
          {
            method: "GET",
            headers: {
              token: token,
            },
          }
        );
        const result = await response.json();
        dispatch({ type: "setUser", payload: result.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const duration = localStorage.getItem("selectedDuration") || "month";
    setSelectedDuration(duration);
    getUserById();
    const day = localStorage.getItem("historyDate") || calDate;
    setCalDate(day);
  }, []);

  // CASE
  useEffect(() => {
    switch (selectedDuration) {
      case "week":
        handleWeek();
        break;
      case "month":
        handleMonth();
        break;
      case "day":
        handleDay();
        break;
      case "year":
        handleYear();
        break;
      default:
        break;
    }
  }, [
    selectedDuration,
    month,
    monthYear,
    year,
    calDate,
    weekStart,
    weekLast,
    state.user,
  ]);

  // HANDLE LAST WEEK
  const handleWeek = () => {
    setSelectedDuration("week");
    localStorage.setItem("selectedDuration", "week");
    const currentWeekExpenses = state.user?.expenses.filter((exp) => {
      if (new Date(weekStart).getMonth() === new Date(weekLast).getMonth()) {
        return (
          new Date(exp.date).getDate() >= new Date(weekStart).getDate() &&
          new Date(exp.date).getMonth() >= new Date(weekStart).getMonth() &&
          new Date(exp.date).getFullYear() >=
            new Date(weekStart).getFullYear() &&
          new Date(exp.date).getDate() <= new Date(weekLast).getDate() &&
          new Date(exp.date).getMonth() <= new Date(weekLast).getMonth() &&
          new Date(exp.date).getFullYear() <= new Date(weekLast).getFullYear()
        );
      } else if (
        new Date(weekStart).getMonth() < new Date(weekLast).getMonth()
      ) {
        return (
          (new Date(exp.date).getDate() >= new Date(weekStart).getDate() &&
            new Date(exp.date).getMonth() >= new Date(weekStart).getMonth() &&
            new Date(exp.date).getFullYear() >=
              new Date(weekStart).getFullYear()) ||
          (new Date(exp.date).getDate() <= new Date(weekLast).getDate() &&
            new Date(exp.date).getMonth() <= new Date(weekLast).getMonth() &&
            new Date(exp.date).getFullYear() <=
              new Date(weekLast).getFullYear())
        );
      }
    });

    const currentWeekIncomes = state.user?.incomes.filter((inc) => {
      if (new Date(weekStart).getMonth() === new Date(weekLast).getMonth()) {
        return (
          new Date(inc.date).getDate() >= new Date(weekStart).getDate() &&
          new Date(inc.date).getMonth() >= new Date(weekStart).getMonth() &&
          new Date(inc.date).getFullYear() >=
            new Date(weekStart).getFullYear() &&
          new Date(inc.date).getDate() <= new Date(weekLast).getDate() &&
          new Date(inc.date).getMonth() <= new Date(weekLast).getMonth() &&
          new Date(inc.date).getFullYear() <= new Date(weekLast).getFullYear()
        );
      } else if (
        new Date(weekStart).getMonth() < new Date(weekLast).getMonth()
      ) {
        return (
          (new Date(inc.date).getDate() >= new Date(weekStart).getDate() &&
            new Date(inc.date).getMonth() >= new Date(weekStart).getMonth() &&
            new Date(inc.date).getFullYear() >=
              new Date(weekStart).getFullYear()) ||
          (new Date(inc.date).getDate() <= new Date(weekLast).getDate() &&
            new Date(inc.date).getMonth() <= new Date(weekLast).getMonth() &&
            new Date(inc.date).getFullYear() <=
              new Date(weekLast).getFullYear())
        );
      }
    });

    const expensesSummary = summariseExpenses(currentWeekExpenses);
    setFilteredExpenses(expensesSummary);
    const incomesSummary = summariseIncomes(currentWeekIncomes);
    setFilteredIncomes(incomesSummary);
  };

  // HANDLE MONTH
  const handleMonth = () => {
    setSelectedDuration("month");
    localStorage.setItem("selectedDuration", "month");
    const currentMonthExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getMonth() === month &&
        new Date(exp.date).getFullYear() === monthYear
    );
    const currentMonthIncomes = state.user?.incomes.filter(
      (inc) =>
        new Date(inc.date).getMonth() === month &&
        new Date(inc.date).getFullYear() === monthYear
    );
    const expensesSummary = summariseExpenses(currentMonthExpenses);
    const incomesSummary = summariseIncomes(currentMonthIncomes);
    setFilteredExpenses(expensesSummary);
    setFilteredIncomes(incomesSummary);
  };

  // HANDLE YEAR
  const handleYear = () => {
    setSelectedDuration("year");
    localStorage.setItem("selectedDuration", "year");
    const yearlyExpenses = state.user?.expenses.filter(
      (exp) => new Date(exp.date).getFullYear() === year
    );
    const yearlyIncomes = state.user?.incomes.filter(
      (inc) => new Date(inc.date).getFullYear() === year
    );
    const expensesSummary = summariseExpenses(yearlyExpenses);
    const incomesSummary = summariseIncomes(yearlyIncomes);
    setFilteredExpenses(expensesSummary);
    setFilteredIncomes(incomesSummary);
  };

  // SELECTED DATE
  const selectedDate = (calDate) => {
    setCalDate(calDate);
    handleDay();
  };

  // HANDLE DAY
  const handleDay = () => {
    setSelectedDuration("day");
    localStorage.setItem("selectedDuration", "day");
    const currentDayExpenses = state.user?.expenses.filter(
      (exp) =>
        new Date(exp.date).getDate() === new Date(calDate).getDate() &&
        new Date(exp.date).getMonth() === new Date(calDate).getMonth() &&
        new Date(exp.date).getFullYear() === new Date(calDate).getFullYear()
    );
    const currentDayIncomes = state.user?.incomes.filter(
      (inc) =>
        new Date(inc.date).getDate() === new Date(calDate).getDate() &&
        new Date(inc.date).getMonth() === new Date(calDate).getMonth() &&
        new Date(inc.date).getFullYear() === new Date(calDate).getFullYear()
    );

    setFilteredExpenses(currentDayExpenses);
    setFilteredIncomes(currentDayIncomes);
  };

  // HANDLE LAST MONTH
  const handleLastMoth = () => {
    if (month >= 1 && month <= 11) {
      setMonth(month - 1);
    } else if (month === 0) {
      setMonth(11);
      setMonthYear(monthYear - 1);
    }
    getUserById();
  };

  // HANDLE NEXT MONTH
  const handleNextMonth = () => {
    if (month >= 0 && month <= 10) {
      setMonth(month + 1);
    } else if (month === 11) {
      setMonth(0);
      setMonthYear(monthYear + 1);
    }
    getUserById();
  };

  // HANDLE LAST YEAR
  const handleLastYear = () => {
    setYear(year - 1);
    getUserById();
  };

  // HANDLE NEXT YEAR
  const handleNextYear = () => {
    setYear(year + 1);
    localStorage.setItem("historyYear", year);
    getUserById();
  };
  const handleLastWeek = () => {
    const lastWeekStart = setToStartOfWeek(
      new Date(weekDay.setDate(weekDay.getDate() - 7))
    );
    setWeekStart(lastWeekStart);
    setWeekLast(setToEndOfWeek(new Date(lastWeekStart)));
    getUserById();
  };
  const handleNextWeek = () => {
    const nextWeekStart = setToStartOfWeek(
      new Date(weekDay.setDate(weekDay.getDate() + 7))
    );
    setWeekStart(nextWeekStart);
    setWeekLast(setToEndOfWeek(new Date(nextWeekStart)));
    getUserById();
  };

  // HANDLE RECIEPT
  const handleReciept = (url, date, category) => {
    setIsRecieptView(true);
    setRecieptUrl(url);
    setRecieptDate(date);
    setRecieptCategory(category);
  };
  const handleCloseImg = () => {
    setIsRecieptView(false);
  };

  // Total expenses
  const totalExpenses = filteredExpenses?.reduce((acc, exp) => {
    acc += exp.amount;
    return parseFloat(acc.toFixed(2));
  }, 0);

  // Total incomes
  const totalIncomes = filteredIncomes?.reduce((acc, inc) => {
    acc += inc.amount;
    return parseFloat(acc.toFixed(2));
  }, 0);

  // Total balance
  const totalBalance = parseFloat((totalIncomes - totalExpenses).toFixed(2));

  let durationLabel;

  switch (selectedDuration) {
    case "day":
      durationLabel = `${new Date(calDate).toLocaleDateString()}`;
      break;
    case "week":
      durationLabel = `${weekStart.toLocaleDateString()} - ${weekLast.toLocaleDateString()}`;
      break;
    case "month":
      durationLabel = `${months[month]} ${monthYear}`;
      break;
    case "year":
      durationLabel = `${year}`;
      break;
    default:
      durationLabel = "All";
      break;
  }

  const downloadData = () => {
    const csvContent =
      `Duration${durationLabel}\n` +
      `Category,Amount,Receipt\n` +
      filteredExpenses
        .map(
          (expense) =>
            `${expense.category},${expense.amount},${BASE_URL}/${expense.reciept}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="history">
      <SideMenu />
      {/* HERO  */}
      <div className="historyHero">
        {isRecieptView && (
          <div className="reciept-container">
            <button onClick={handleCloseImg} className="closeImage">
              <i class="fa-solid fa-circle-xmark"></i>
            </button>
            <img src={recieptUrl} alt="no-img" className="selectReciept" />
            <div className="reciept-details">
              <p>
                Category -{" "}
                {recieptCategory.charAt(0).toUpperCase() +
                  recieptCategory.slice(1)}
              </p>
              <p>Uploaded On - {new Date(recieptDate).toLocaleDateString()}</p>
            </div>
          </div>
        )}
        <div className="historyTop">
          <h2>
            Select the duration <span></span>
            <i className="fa-solid fa-down-long"></i>{" "}
          </h2>
          <ul className="historyTop-options">
            <li>
              <button type="submit" onClick={handleDay}>
                Daily
              </button>
            </li>
            <li>
              <button type="submit" onClick={handleWeek}>
                Weekly
              </button>
            </li>
            <li>
              <button type="submit" onClick={handleMonth}>
                Monthly
              </button>
            </li>
            <li>
              <button type="submit" onClick={handleYear}>
                Yearly
              </button>
            </li>
          </ul>
        </div>
        <div className="historyBottom">
          <h2>
            Expenses and Incomes for the selected{" "}
            <span className="durationDescTitle">{selectedDuration}</span>{" "}
            <span className="durationTitle"> {durationLabel}</span>
          </h2>

          <div className="history-bottom-top-left">
            {/* SELECT MONTH YEAR DAY */}
            <div className="history-bottom-data">
              <button
                className="downloadExpBtn"
                type="button"
                onClick={downloadData}
              >
                Download Expenses<i className="fa-solid fa-file-arrow-down"></i>
              </button>
              {selectedDuration === "month" && (
                <div className="history-timeTravel">
                  <button
                    type="submit"
                    className="timeButton"
                    onClick={handleLastMoth}
                  >
                    <i className="fa-solid fa-circle-chevron-left"></i>
                  </button>
                  <h3>
                    {months[month]}
                    <span> {monthYear}</span>
                  </h3>
                  <button
                    type="submit"
                    className="timeButton"
                    onClick={handleNextMonth}
                  >
                    <i className="fa-solid fa-circle-chevron-right"></i>
                  </button>
                </div>
              )}
              {selectedDuration === "year" && (
                <div className="history-timeTravel">
                  <button
                    type="submit"
                    className="timeButton"
                    onClick={handleLastYear}
                  >
                    <i className="fa-solid fa-circle-chevron-left"></i>
                  </button>
                  <h3>
                    <span>{year}</span>
                  </h3>
                  <button
                    type="submit"
                    className="timeButton"
                    onClick={handleNextYear}
                  >
                    <i className="fa-solid fa-circle-chevron-right"></i>
                  </button>
                </div>
              )}
              {selectedDuration === "week" && (
                <div className="history-timeTravel">
                  <button
                    type="submit"
                    onClick={handleLastWeek}
                    className="timeButton"
                  >
                    <i className="fa-solid fa-circle-chevron-left"></i>
                  </button>
                  <h3>
                    <span>{`${new Date(
                      weekStart
                    ).toLocaleDateString()} - ${new Date(
                      weekLast
                    ).toLocaleDateString()} `}</span>
                  </h3>
                  <button
                    type="submit"
                    className="timeButton"
                    onClick={handleNextWeek}
                  >
                    <i className="fa-solid fa-circle-chevron-right"></i>
                  </button>
                </div>
              )}
              {/* SHOW EXPENSES */}
              <div className="data-container">
                {selectedDuration === "day" && (
                  <div className="historyCalendarContainer">
                    <Calendar
                      value={calDate}
                      onChange={selectedDate}
                      name="calendar"
                      className="calendar"
                    />
                  </div>
                )}

                <div className="expData-container">
                  <h2>Expenses</h2>
                  <table className="exp-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>{`Amount-${curr}`}</th>
                        {selectedDuration === "day" && (
                          <th>
                            Reciept
                            <span className="viewRec">click to view</span>
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredExpenses
                        ?.map((exp, index) => (
                          <tr className="expData" key={index}>
                            <td className="data">
                              {exp?.category.charAt(0).toUpperCase() +
                                exp?.category.slice(1)}
                            </td>
                            <td className="data">{exp?.amount?.toFixed(2)}</td>
                            {selectedDuration === "day" && (
                              <td className="data">
                                <img
                                  src={
                                    exp.reciept.includes("undefined")
                                      ? "images/no-image.jpg"
                                      : `${BASE_URL}/${exp.reciept}`
                                  }
                                  alt="no-img"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "1px solid",
                                    objectFit: "cover",
                                  }}
                                  onClick={() =>
                                    handleReciept(
                                      exp.reciept.includes("undefined")
                                        ? "images/no-image.jpg"
                                        : `${BASE_URL}/${exp.reciept}`,
                                      exp.date,
                                      exp.category
                                    )
                                  }
                                />
                              </td>
                            )}
                          </tr>
                        ))
                        .reverse()}
                    </tbody>
                  </table>
                </div>
                <div className="incData-container">
                  <h2>Incomes</h2>
                  <table className="inc-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>{`Amount in ${curr}`}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredIncomes?.map((inc, index) => (
                        <tr className="incData" key={index}>
                          <td className="data">
                            {inc?.category.charAt(0).toUpperCase() +
                              inc?.category.slice(1)}
                          </td>
                          <td className="data">{inc?.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* SHOW INCOMES */}
          </div>
          <div className="history-bottom-top-right">
            <div className="expensesTotal total">
              {window.innerWidth < 760
                ? `Expenses : ${totalExpenses}`
                : `Expenses of the selected ${selectedDuration}`}
              <span> {totalExpenses}</span>
            </div>
            <div className="incomesTotal total">
              {window.innerWidth < 760
                ? `Incomes : ${totalIncomes}`
                : `Incomes of the selected ${selectedDuration}`}
              <span> {totalIncomes}</span>
            </div>
            <div
              className={`displayReport total ${
                totalBalance < 0 ? "negativeBal" : "positiveBal"
              }`}
            >
              {window.innerWidth < 760
                ? `Balance : ${totalBalance}`
                : `Balanceof the selected ${selectedDuration}`}
              <span> {totalBalance}</span>
            </div>
          </div>

          <div className="history-bottom-bottom">
            <div className="history-bottom-expenses-graphs">
              <h4 className="history-graph-title">Expenses</h4>
              <HistoryExpMainGraph
                selectedDuration={selectedDuration}
                year={year}
                month={month}
                monthYear={monthYear}
                day={calDate}
                weekStart={weekStart}
                weekLast={weekLast}
                weekDay={weekDay}
              />
            </div>
            <div className="history-bottom-incomes-graphs">
              <h4 className="history-graph-title">Incomes</h4>
              <IncomeMainGraph
                selectedDuration={selectedDuration}
                year={year}
                month={month}
                monthYear={monthYear}
                day={calDate}
                weekStart={weekStart}
                weekLast={weekLast}
                weekDay={weekDay}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
export default History;
