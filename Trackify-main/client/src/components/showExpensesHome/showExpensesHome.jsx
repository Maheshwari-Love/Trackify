import React from "react";
import { useContext, useEffect } from "react";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import "./showExpensesHome.css";

function ShowExpensesHome() {
  const { state, dispatch } = useContext(context);
  let curr = state.user?.currency?.slice(3);

  // Fetch user's expenses when the component mounts.
  useEffect(() => {
    const token = localStorage.getItem("token");

    // GET request to retrieve user's expenses
    fetch(`${BASE_URL}/api/expenses/getExpensesByUser`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: "setExpenses", payload: result.data }))
      .catch((err) => console.log(err));
  }, [state.user]);

  return (
    <div className="showExpensesHome">
      <table className="expenses-home-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Reciept</th>
          </tr>
        </thead>

        <tbody>
          {/* Display expenses */}
          {state.expenses?.length > 3
            ? state.expenses

                .map((expense) => {
                  return (
                    <tr key={expense._id} className="showExpenses">
                      <td>{new Date(expense?.date).toLocaleDateString()}</td>
                      <td>
                        {expense?.category?.charAt(0).toUpperCase() +
                          expense?.category.slice(1)}
                      </td>
                      <td>
                        {expense?.amount}
                        <span>{curr}</span>
                      </td>

                      <td>
                        <img
                          /* Displaying the receipt image or a default image if undefined */
                          src={
                            expense.reciept.includes("undefined")
                              ? "images/no-image.jpg"
                              : `${BASE_URL}/${expense.reciept}`
                          }
                          alt="no-img"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </td>
                    </tr>
                  );
                })
                .reverse()
                .slice(0, 6)
            : state.expenses
                .map((expense) => {
                  return (
                    <tr key={expense?._id} className="showExpenses">
                      <td>{new Date(expense?.date).toLocaleDateString()}</td>
                      <td>
                        {expense?.category?.charAt(0).toUpperCase() +
                          expense?.category.slice(1)}
                      </td>
                      <td>
                        {expense?.amount}
                        <span>{curr}</span>
                      </td>

                      <td>
                        <img
                          src={
                            expense.reciept.includes("undefined")
                              ? "images/no-image.jpg"
                              : `${BASE_URL}/${expense.reciept}`
                          }
                          alt="no-img"                         
                          style={{ width: "20px", height: "20px" }}
                        />
                      </td>
                    </tr>
                  );
                })
                .reverse()}
        </tbody>
      </table>
    </div>
  );
}

export default ShowExpensesHome;
