import React from "react";
import "./help.css";
import Profile from "../profile/Profile";
import SideMenu from "../sideMenu/SideMenu";

function Help() {
  return (
    <div className="Help">
      <SideMenu />
      <div className="HelpHero">
        <h1>FAQs</h1>
        <section className="questions">
          <h2> Q1 How to check my previous entries? </h2>
          <p>
            {" "}
            If you wish to review your previous entries, expenses or incomes, go
            to the history tab, there you can check your daily, weekly, monthly
            and annual{" "}
          </p>
          <h2> Q2 How do I change my user details? </h2>
          <p>
            {" "}
            If you wish to change your user details, you can do that by going to
            the settings tab, and click on Update Profile Details.{" "}
          </p>
          <h2>Q3 How to change currency of my income or expenses?</h2>
          <p>
            {" "}
            If you wish to change currencies on income or expenses, you can go
            Settings and click on the change currency tab.{" "}
          </p>
          <h2> Q4 How to add receipts? </h2>
          <p>
            {" "}
            If you wish to add receipts to your expenses, go to the "Add
            expenses" Tab, after you enter the category, with the "Add Reciept"
            you can upload your receipt as an image.{" "}
          </p>
          <h2> Q5 How to view my uploaded receipts? </h2>
          <p>
            {" "}
            If you wish to view your uploaded receipts, go to the "Add expenses"
            Tab, select particular day from the list of expenses, and click on
            the reciept icon for that date.{" "}
          </p>
          <h2> Q6 How to change to screen from Dark mode to Light Mode? </h2>
          <p>
            {" "}
            If you wish to switch the screen from Dark mode to Light Mode, go to
            the Settings Tab, then the bottom option will change the screen from
            Light Mode to Dark Mode.{" "}
          </p>
        </section>
      </div>
    </div>
  );
}

export default Help;
