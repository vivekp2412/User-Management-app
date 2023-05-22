import image from "../../assets/signupimage.png";
import Signupform from "./Signupform";
import "./Signuppage.css";
//Signup Page Component
function Signuppage() {
  return (
    <div className="signup-layout">
      <div className="signup-form-container">
        <Signupform />
      </div>
      <div className="signup-image-container">
        <img src={image} className="signup-image" />
      </div>
    </div>
  );
}

export default Signuppage;
