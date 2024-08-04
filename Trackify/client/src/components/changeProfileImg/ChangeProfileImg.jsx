import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/urlConfig";
import { context } from "../../context/context";
import "./ChangeProfileImg.css";
import { toast, Toaster } from "react-hot-toast";

export default function ChangeProfileImg() {
  const { state, dispatch } = useContext(context);
  const [preview, setPreview] = useState("");

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

  function grabImage(e) {
    e.stopPropagation();
    dispatch({ type: "setChangeImage", payload: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  }

  // Handle grabbing the selected image and updating the preview
  function handleChangeImg(e) {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const upLoad = new FormData();
    upLoad.append("userImage", state.changeImage);

    // PATCH request to change the user's profile image
    axios
      .patch(`${BASE_URL}/api/users/changeProfileImg`, upLoad, {
        headers: { token: token },
      })
      .then((result) =>
        dispatch({
          type: "setUser",
          payload: result.data.data,
        })
      )
      .catch((error) => {
        console.log(error);
      });
    setPreview("");
    toast.success("Profile Image Changed Successfully!");
    getUserById();
  }

  return (
    <div className="change-profile">
      <Toaster />
      <h1 className="profile-h1">Profile Image</h1>
      <form className="profile-form" action="" onSubmit={handleChangeImg}>
        <div className="profile-input-container">
          <input type="file" name="file" onChange={grabImage} />
        </div>
        <img src={preview} alt="" className="form-img" />
        <button className="profile-submit">Submit</button>
      </form>
    </div>
  );
}
