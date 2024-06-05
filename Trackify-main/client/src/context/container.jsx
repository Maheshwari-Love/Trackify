import { useReducer, useEffect, useState } from "react";
import { context } from "./context";
import { initialState, reducer } from "./reducer";
import BASE_URL from "../config/urlConfig";

export default function Container({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [darkMode, setDarkMode] = useState(false);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sepetember",
    "October",
    "November",
    "December",
  ];

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    //on load
    const token = localStorage.getItem("token");
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    if (token) {
      fetch(`${BASE_URL}/api/users/verifytoken`, {
        method: "GET",
        headers: { token: token },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            dispatch({ type: "setUser", payload: result.data });
          } else {
            console.log(result.message);
          }
        });
    }
  }, []);

  return (
    <context.Provider
      value={{ state, dispatch, darkMode, setDarkMode, months, weekday }}
    >
      {children}
    </context.Provider>
  );
}
