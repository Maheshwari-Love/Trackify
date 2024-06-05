import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import Footer from "../footer/Footer";
import LandNavBar from "../landingNavBar/LandNavBar";
import "./selectCurrency.css";

function SelectCurrency() {
  const { state, dispatch } = useContext(context);
  const currenySearch = useRef();
  const navigate = useNavigate();
  const selectedCurr = useRef();
  const [all, setAll] = useState(null);
  const [filter, setFilter] = useState(null);
  const [curr, setCurr] = useState(null);
  console.log(curr);

  useEffect(() => {
    console.log(state.isSignUp);

    dispatch({ type: "setIsSignUp", payload: true });
  }, [state.isSignUp]);

  let res = all && [...Object.entries(all)];
  const getUserById = () => {
    if (state.user) {
      const token = localStorage.getItem("token");

      // Fetch user details using the user's ID
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

  // Fetching all currencies and handling search input
  const handleSearch = (e) => {
    fetch("https://openexchangerates.org/api/currencies.json")
      .then((res) => res.json())
      .then((result) => setAll(result))
      .catch((err) => console.log(err));

    let searchValue = currenySearch.current.value;
    setFilter(
      res?.filter((val) => {
        return val[1].includes(
          searchValue[0]?.toUpperCase() + searchValue?.slice(1)
        );
      })
    );
  };

  // Handling selection of a currency
  const handleSelectedCurr = (value) => {
    setCurr(value);
    currenySearch.current.value = value;
    setFilter(null);
  };

  // Handling form submission
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    const user = { ...state.user, currency: curr };

    if (curr) {
      // Updating user's currency on the server
      fetch(`${BASE_URL}/api/users/updateCurrencyById/${state.user?._id}`, {
        method: "PATCH",
        headers: { token: token, "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((result) => {
          dispatch({ type: "setUser", payload: result.data });
          if (result.success) {
            navigate("/home");
          }
        })
        .catch((err) => console.log(err));
    }
    getUserById();
  };

  return (
    <>
      {state.isSignUp && <LandNavBar />}
      <div className={state.isSignUp ? "signUp-Currency" : "selectCurr"}>
        <div className="curr-Left">
          {/* Input for currency search */}
          <label className="currency-label" htmlFor="dropdown">
            Currency:
          </label>
          <input
            type="search"
            className="currencySearch"
            name="search"
            ref={currenySearch}
            onInput={handleSearch}
          />
          {filter && filter.length > 0 && (
            <div className="alllistCurrencies">
              {filter?.map((re) => {
                return (
                  <div className="singleCurrList">
                    <button
                      className="curr-btn"
                      type="button"
                      ref={selectedCurr}
                      onClick={() => handleSelectedCurr(re[0] + " " + re[1])}
                    >
                      {re[0] + " " + re[1]}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {curr && (
            <div className="div-submit">
              <button
                className="curr-submit"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </div>
        <div></div>
      </div>
      {state.isSignUp && <Footer />}
    </>
  );
}

export default SelectCurrency;
