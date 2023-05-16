import image from "../../assets/signupimage.png";
import Signupform from "./Loginform";
import "../Signup/Signuppage.css";
function Loginpage() {
  return (
    <div className="login-layout">
      <div className="login-form-container">
        <Signupform />
      </div>
      <div className="login-image-container">
        <img src={image} className="login-image" />
      </div>
    </div>
  );
}

export default Loginpage;
