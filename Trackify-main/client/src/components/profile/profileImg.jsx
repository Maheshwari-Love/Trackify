import { useContext } from "react";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import "./profile.css";

export default function ProfileImg() {
  const { state, dispatch } = useContext(context);
  return (
    <div className="page">
      <div className="profile-image-container">
        <img
          src={
            !state.user?.userImage ||
            state.user?.userImage.includes("undefined")
              ? "images/profilePic.jpg"
              : `${BASE_URL}/${state.user?.userImage}`
          }
          alt="noImg"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#ccc",
            marginLeft: "0.8rem",
          }}
          className="profile-img"
        />
      </div>
    </div>
  );
}
