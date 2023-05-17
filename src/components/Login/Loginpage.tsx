import image from "../../assets/signupimage.png";
import Loginform from "./Loginform";
import "../Signup/Signuppage.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
function Loginpage() {
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isloggedin);
  return (
    <div className="login-layout">
      <div className="login-form-container">
        <Loginform />
      </div>
      <div className="login-image-container">
        <img src={image} className="login-image" />
      </div>
    </div>
  );
}

export default Loginpage;
