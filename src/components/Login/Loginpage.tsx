import image from "../../assets/signupimage.png";
import Loginform from "./Loginform";
import "../Signup/Signuppage.css";
import { useSelector } from "react-redux";
//interface for State
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
//Login Page Component
function Loginpage() {
  const isLogged = useSelector((state: Statetype) => state.user.isloggedin);
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
