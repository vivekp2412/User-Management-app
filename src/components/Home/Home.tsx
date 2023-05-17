import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../slices/userSlices";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userinfo);
  return (
    <>
      <div>profile</div>
      <img src={userData.profile}></img>
      <p>{userData.name}</p>
      <p>{userData.email}</p>
      <p>{userData.number}</p>

      <button
        onClick={() => {
          dispatch(logoutUser());
          navigate("/login");
        }}
      >
        Logout
      </button>
    </>
  );
}

export default Home;
