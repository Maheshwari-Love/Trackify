import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import ShowExpensesHome from "../showExpensesHome/showExpensesHome";
import SideMenu from "../sideMenu/SideMenu";
import "./home.css";
import Profile from "../profile/Profile";
import ExpensesHomeGraph from "../graph/HomeGraphs/ExpensesHomeGraph";
import Balance from "../balance/Balance";

export default function Home() {
  const { state, dispatch } = useContext(context);
  const [showSideMenu, setShowSideMenu] = useState(true);
  const navigate = useNavigate();
  const months = [
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

  // Fetching user expenses data when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Making a GET request to fetch user expenses using the API
    fetch(`${BASE_URL}/api/expenses/getExpensesByUser`, {
      method: "GET",
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((result) => dispatch({ type: "setExpenses", payload: result.data }))
      .catch((err) => console.log(err));
    const showMenu = localStorage.getItem("sideMenuShow");
  }, []);

  // Navigate to Add Expenses
  const homeAddNewExp = () => {
    navigate("/addExpenses");
  };

  // Navigate to Add Incomes
  const homeAddNewInc = () => {
    navigate("/addIncomes");
  };

  return (
    <div className="home">
      <SideMenu />
      <div className="homeHero">
        <div className="homeHeroTop">
          <h4>{`Expenses in ${
            months[new Date().getMonth()]
          } ${new Date().getFullYear()}`}</h4>
          <ExpensesHomeGraph />
        </div>

        {window.innerWidth <= 700 && (
          <div className="home-balance-container">
            <div className="home-balance">
              <h3 className="home-balance-title">Balance</h3>
              <Balance userId={state.user?._id} />
            </div>
          </div>
        )}
        <div className="homeHeroMiddle">
          <h4 className="homeExpTitle">Latest Entered Expenses</h4>

          {state.expenses?.length > 0 ? (
            <ShowExpensesHome />
          ) : (
            <p className="homeExpensesDisplay">No Expenses to Show</p>
          )}
        </div>
        <div className="homeHeroBottom darkmode">
          <button
            className="homeAddExpButton darkmodeExpenses"
            onClick={() => homeAddNewExp()}
          >
            Add Expenses
            <span>
              <i className="fa-regular fa-square-plus"></i>
            </span>
          </button>
          <button
            className="homeAddIncomeButton darkmodeIncomes"
            onClick={() => homeAddNewInc()}
          >
            Add Incomes
            <span>
              <i className="fa-regular fa-square-plus"></i>
            </span>
          </button>
        </div>
      </div>
      <Profile />
    </div>
  );
}
