import React, { useContext } from "react";
import "./about.css";
import LineChart from "../graph/lineChart";
import LandNavBar from "../landingNavBar/LandNavBar";
import { context } from "../../context/context";
import Footer from "../footer/Footer";

export default function About() {
  const { state, dispatch } = useContext(context);
  return (
    <div className="about-container">
      {state.isOnSignAndLogin && <LandNavBar />}

      <section className="headline"></section>

      {!state.isOnSignAndLogin && (
        <main className="cards-container">
          {/* Card-1 */}
          <div className="card">
            <h2>Track your expenses and incomes</h2>
            <img
              className="imgOne"
              src="images/img-card1.jpg"
              alt="holding money"
            />
            <p>
              You can track and manage your expenses with ease using our expense
              tracking app.
            </p>
          </div>

          {/* Card-2 */}
          <div className="card">
            <h2>Track expenses with graphs</h2>
            <LineChart />
            <p>
              Visualize your income over time with interactive graphs and charts
              for better financial insights.
            </p>
          </div>

          {/* Card-3 */}
          <div className="card">
            <h2>Weekly, monthly or yearly history</h2>
            <img className="imgOne" src="images/img-card3.jpg" alt="graph" />
            <p>
              Explore your financial history with weekly and monthly reports,
              helping you plan for the future.
            </p>
          </div>
        </main>
      )}

      <div id="about"></div>
      <div className="about-app">
        <h1 className="about-app-title">
          <span>Why to use</span> Trackify?
        </h1>
        <p className="about-app-p">
          <strong>Easy to use:</strong> Track expenses on-the-go with
          categorization and logging.
        </p>
        <p className="about-app-p">
          <strong>Budget Planning:</strong> Expensify enables you to set budgets
          for different categories, helping you allocate funds wisely and avoid
          exceeding your financial limits.
        </p>
        <p className="about-app-p">
          <strong>Data-driven insights:</strong> Expense tracker can provide
          valuable insights into your spending habits, allowing you to make more
          informed decisions.
        </p>
        <p className="about-app-p">
          <strong>Identify overspending:</strong> Take control of your finances
          by identifying and reducing overspending with an expense tracker.
        </p>
        <p className="about-app-p">
          <strong>Real-time visibility:</strong> Monitor your expenses in
          real-time, whether you are at home or on-the-go, with a user-friendly
          interface.
        </p>
        <p className="about-app-p">
          <strong>Expense Reports:</strong> Centralize, control and track all
          expenses.
        </p>
        <p className="about-app-p">
          <strong>Visual Reports:</strong> Utilize visual graphs and charts
          generated by the app to quickly grasp spending patterns, making it
          easier to identify areas for improvement in your financial management.
        </p>
        <p className="about-app-p">
          <strong>Goal Tracking:</strong> Whether you're saving for a vacation,
          a new gadget, or an emergency fund, the expense tracker can help you
          monitor progress towards your financial goals.
        </p>
      </div>
      {state.isOnSignAndLogin && <Footer />}
    </div>
  );
}