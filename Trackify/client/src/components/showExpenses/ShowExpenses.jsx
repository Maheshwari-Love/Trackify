import React, { useContext, useEffect } from "react";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import "./showExpenses.css";
import toast, { Toaster } from "react-hot-toast";

function ShowExpenses() {
  const { state, dispatch } = useContext(context);
  const curr = state.user?.currency?.slice(3);

  // Fetch user expenses from the server
  const getExpenseByUser = () => {
    const token = localStorage.getItem("token");
    fetch(`${BASE_URL}/api/expenses/getExpensesByUser`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: "setExpenses", payload: result.data }))
      .catch((err) => console.log(err));
  };

  // Fetch user information by ID
  const getUserById = () => {
    if (state.user) {
      const token = localStorage.getItem("token");
      fetch(`${BASE_URL}/api/users/getUserById/${state.user?._id}`, {
        method: "GET",
        headers: {
          token: token,
        },
      })
        .then((res) => res.json())
        .then((result) => dispatch({ type: "setUser", payload: result.data }))
        .catch((err) => console.log(err));
    }
  };

  // Fetch expenses and user information on component mount
  useEffect(() => {
    getExpenseByUser();
    getUserById();
  }, []);

  // Delete expense by ID
  const deleteExpense = (id) => {
    const token = localStorage.getItem("token");
    if (id) {
      fetch(`${BASE_URL}/api/expenses/deleteExpense/${id}`, {
        method: "DELETE",
        headers: {
          token: token,
        },

        body: JSON.stringify({ userId: id }),
      })
        .then((res) => res.json())
        .then((result) => {
          toast.success("expenses Deleted");
          console.log(state.user);
        })
        .catch((err) => console.log(err));
    }

    // Refresh expenses and user information after deletion
    getExpenseByUser();
    getUserById();
  };

  return (
    <div>
      <Toaster position="top-center" />
      {/* Main container for displaying expenses */}
      {state.user?.expenses.length > 0 && (
        <section className="showExpenses">
          <table className="showExpTable">
            <thead>
              {/* Table header */}
              <tr>
                <th className="expTableHead">Date</th>
                <th className="expTableHead">Category</th>
                <th className="expTableHead">Amount</th>
                <th className="expTableHead">Reciept</th>
                <th className="expTableHead"></th>
              </tr>
            </thead>
            <tbody>
              {/* Map through expenses and render rows */}
              {state.expenses
                ? state.expenses
                    ?.map((expense) => {
                      return (
                        /* Display expense details */
                        <tr key={expense?._id} className="showExpenses">
                          <td>
                            {new Date(expense?.date).toLocaleDateString()}
                          </td>
                          <td>
                            {expense?.category?.charAt(0)?.toUpperCase() +
                              expense?.category?.slice(1)}
                          </td>
                          <td>
                            {expense?.amount}
                            <span>{curr}</span>
                          </td>

                          {/* Display receipt image */}
                          <td>
                            <img
                              className="expenseTableImage"
                              src={
                                expense.reciept.includes("undefined")
                                  ? "images/no-image.jpg"
                                  : `${BASE_URL}/${expense.reciept}`
                              }
                              alt="no-img"
                            />
                          </td>
                          {/* Delete button */}
                          <td>
                            <button
                              type="button"
                              onClick={() => deleteExpense(expense?._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                    .reverse()
                    .slice(0, 20)
                : state.user?.expenses
                    ?.map((expense) => {
                      return (
                        <tr key={expense._id} className="showExpenses">
                          <td>
                            {new Date(expense?.date).toLocaleDateString()}
                          </td>
                          <td>
                            {expense?.category?.charAt(0)?.toUpperCase() +
                              expense?.category?.slice(1)}
                          </td>
                          <td>
                            {expense?.amount}
                            <span>{curr}</span>
                          </td>

                          <td>
                            {" "}
                            <img
                              className="expenseTableImage"
                              src={
                                expense.reciept.includes("undefined")
                                  ? "images/no-image.jpg"
                                  : `${BASE_URL}/${expense.reciept}`
                              }
                              alt="no-img"
                            />
                          </td>

                          <td>
                            <button
                              type="button"
                              onClick={() => deleteExpense(expense?._id)}
                            >
                              {window.innerWidth < 760 ? "" : "Delete"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                    .reverse()
                    .slice(0, 20)}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}

export default ShowExpenses;
