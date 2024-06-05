import React, { useContext } from "react";
import { context } from "../../../../context/context";
import HistoryExpDayGraph from "../DayExpensesGraph/HistoryExpDayGraph";
import HistoryExpMonthGraph from "../MonthExpensesGraphs/HistoryExpMonthGraph";
import HistoryExpWeekGraph from "../WeekExpensesGraphs/HistoryExpWeekGraph";
import HistoryExpYearGraph from "../YearExpensesGraphs/HistoryExpYearGraph";
import "../../barChartStyle.css";
function HistoryExpMainGraph({
  selectedDuration,
  year,
  monthYear,
  month,
  day,
  weekStart,
  weekLast,
}) {
  const { state, dispatch } = useContext(context);
  return (
    <div>
      {selectedDuration === "year" && <HistoryExpYearGraph year={year} />}
      {selectedDuration === "month" && (
        <HistoryExpMonthGraph month={month} monthYear={monthYear} />
      )}
      {selectedDuration === "day" && (
        <HistoryExpDayGraph day={day} month={month} />
      )}
      {selectedDuration === "week" && (
        <HistoryExpWeekGraph weekStart={weekStart} weekLast={weekLast} />
      )}
    </div>
  );
}

export default HistoryExpMainGraph;
