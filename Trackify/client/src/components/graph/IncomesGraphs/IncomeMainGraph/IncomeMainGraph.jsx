import React, { useContext } from "react";
import { context } from "../../../../context/context";
import HistoryIncDayGraph from "../IncomeDayGraphs/HistoryIncDayGraph";
import HistoryIncMonthGraph from "../IncomeMonthGraphs/HistoryIncMonthGraph";
import HistoryIncWeekGraph from "../IncomeWeekGraphs/HistoryIncWeekGraph";
import HistoryIncYearGraph from "../IncomeYearGraphs/HistoryIncYearGraph";
import "../../barChartStyle.css";

function IncomeMainGraph({
  selectedDuration,
  year,
  month,
  day,
  weekStart,
  weekLast,
  monthYear,
}) {
  const { state, dispatch } = useContext(context);

  return (
    <div>
      {selectedDuration === "year" && <HistoryIncYearGraph year={year} />}
      {selectedDuration === "month" && (
        <HistoryIncMonthGraph month={month} monthYear={monthYear} />
      )}
      {selectedDuration === "day" && <HistoryIncDayGraph day={day} />}
      {selectedDuration === "week" && (
        <HistoryIncWeekGraph weekStart={weekStart} weekLast={weekLast} />
      )}
    </div>
  );
}

export default IncomeMainGraph;
