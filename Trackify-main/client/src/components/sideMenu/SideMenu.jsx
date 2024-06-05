import React, { useContext } from "react";
import "./sideMenu.css";
import { Link, NavLink } from "react-router-dom";
import LogOut from "../logout/Logout";
import ProfileImg from "../profile/profileImg";
import { CgLogOut } from "react-icons/cg";
import { context } from "../../context/context";

export default function SideMenu() {
  const { state, dispatch } = useContext(context);
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch({ type: "setUser", payload: null });
    navigate("/login");
  };
  return (
    <div className="sideBar">
      <div className="sideBarTop">
        <Link to="/" className="sideBar-logo-container flex">
          <img
            className="logo w-36 h-36 justify-center items-center mr-36"
            src="images/logomain.png"
            alt="logo of the project"
          />
        </Link>
        {window.innerWidth <= 760 && <ProfileImg />}
        <ul>
          <li>
            <NavLink to="/home" className="sideNav-Link">
              <i className="fa-solid fa-house"></i>
              <span>Home Page</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/addExpenses" className="sideNav-Link">
              <i className="fa-solid fa-square-minus"></i>
              <span>Add Expenses</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/addIncomes" className="sideNav-Link">
              <i className="fa-solid fa-square-plus"></i>
              <span>Add Incomes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className="sideNav-Link">
              <i className="fa-solid fa-chart-area"></i>
              <span>History</span>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="sideBarBottom">
        <ul>
          <li>
            <NavLink to="/settings" className="sideNav-Link">
              <i className="fa-solid fa-gear"></i>
              <span>Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/help" className="sideNav-Link">
              <i className="fa-solid fa-circle-question"></i>
              <span>Help/FAQ</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className="sideNav-Link side-logout">
              <Link
                to="/login"
                className="flex flex-row gap-2"
                onClick={logoutUser}
              >
                <CgLogOut size={25} className="text-[rgb(3,69,92)]" />
                <span>Logout</span>
              </Link>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
