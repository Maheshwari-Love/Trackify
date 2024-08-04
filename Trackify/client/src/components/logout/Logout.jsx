import { Link } from "react-router-dom";
import { useContext } from "react";
import { context } from "../../context/context";
import { CgLogOut } from "react-icons/cg";
import './Logout.css'

function LogOut() {
  const { state, dispatch } = useContext(context);
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch({ type: "setUser", payload: null });
    navigate("/login");
  };

  return (
    <div className="logout">
      <Link to="/login" className="sideNav-Link side-logout flex flex-row gap-2 w-[80%] text-lg items-center ml-[0.15rem] p-2 text-black" onClick={logoutUser}>
        <CgLogOut className="text-[rgb(3,69,92)]"/><span>Logout</span>
      </Link>
    </div>
  );
}
export default LogOut;
