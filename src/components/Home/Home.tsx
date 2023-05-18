import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { boolean } from "yup";
import { logoutUser } from "../../slices/userSlices";
import "./Home.css";
interface Statetype {
  user: {
    isloggedin: false;
    userinfo: {
      name: string;
      email: string;
      password: string;
      phonenumber: string;
      profile: string;
    };
  };
}
function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: Statetype) => state.user.userinfo);
  return (
    <>
      <div className="navbar">
        <span></span>
        <button
          className="logout-btn"
          onClick={() => {
            dispatch(logoutUser());
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      <div className="user-detail-container">
        <div className="background-strip-gray"></div>
        <div className="profile-title">Profile</div>
        <div className="profile-container">
          <img className="profile-img" src={userData.profile}></img>
        </div>
        <p className="details-title">Details</p>
        <div className="user-details">
          <div className="field-value">
            <span className="field-title">Name:</span>
            <span className="field-value">{userData.name}</span>
          </div>
          <div className="field-value">
            <span className="field-title">Email:</span>
            <span className="field-value">{userData.email}</span>
          </div>
          <div className="field-value">
            <span className="field-title">Phone Number:</span>
            <span className="field-value">{userData.phonenumber}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
