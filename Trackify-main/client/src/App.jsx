import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/landingPage/LandingPage";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import Home from "./components/home/Home";
import AddExpences from "./components/addExpences/AddExpences";
import AddIncomes from "./components/addIncomes/AddIncomes";
import Logout from "./components/logout/Logout";
import Settings from "./components/settings/Settings";
import Help from "./components/Help/Help";
import UpdateUserDetails from "./components/UpdateUserDetails/UpdateUserDetails";
import { useContext } from "react";
import { context } from "./context/context";
import History from "./components/history/History";
import SelectCurrency from "./components/selectCurrency/SelectCurrency";
import About from "./components/about/About";

function App() {
  const { darkMode, setDarkMode } = useContext(context);
  return (
    <div className={darkMode ? "darkMode" : "lightMode"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addExpenses" element={<AddExpences />} />
          <Route path="/addIncomes" element={<AddIncomes />} />
          <Route path="/history" element={<History />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/about" element={<About />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
          <Route path="/UpdateUserDetails" element={<UpdateUserDetails />} />
          <Route path="/selectCurrency" element={<SelectCurrency />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
