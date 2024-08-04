import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config/urlConfig";
import toast, { Toaster } from "react-hot-toast";
import { context } from "../../context/context";
import LandNavBar from "../landingNavBar/LandNavBar";
import "./Login.css";

export default function Login() {
  const { state, dispatch } = useContext(context);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  const navigate = useNavigate();

  function showSignUp() {
    navigate("/signUp");
  }

  const loginUser = (e) => {
    e.preventDefault();

    if (!e.target.email.value || !e.target.password.value) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (e.target.email.value.length < 6 || e.target.password.value.length < 6) {
      toast.error("Email and password must be at least 6 characters long!");
      return;
    }

    if (
      e.target.email.value.length > 50 ||
      e.target.password.value.length > 50
    ) {
      toast.error("Email and password must be less than 50 characters long!");
      return;
    }

    if (!emailRegex.test(e.target.email.value)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!passwordRegex.test(e.target.password.value)) {
      toast.error(
        "Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters!"
      );
      return;
    }

    fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get("token");
        if (token) {
          localStorage.setItem("token", token);
        }
        return res.json();
      })
      .then((result) => {
        if (result.success) {
          dispatch({ type: "setUser", payload: result.data });
          e.target.reset();
          toast.success("You successfully logged in!");
          setTimeout(() => {
            if (state.isSignUp) {
              navigate("/selectCurrency");
            } else {
              navigate("/home");
            }
          }, 1500);
        } else {
          toast.error(JSON.stringify(result.message));
        }
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <LandNavBar />
      <div className="login">
        <div className="loginHero">
          <div className="loginLeft">
            <h1>Login</h1>
            <Toaster position="top-center" />

            <form className="loginForm" onSubmit={loginUser}>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
              ></input>
              <br />
              <br />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              ></input>
              <br />
              <button className="buttonLeft">Login</button>
            </form>
          </div>

          <div className="loginRight">
            <h2>Don't have an account? </h2>
            <p>Signup and start using this amazing app!</p>
            <button className="buttonClick" onClick={showSignUp}>
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
