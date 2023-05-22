import "./App.css";
import Signuppage from "./components/Signup/Signuppage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Loginpage from "./components/Login/Loginpage";
import Home from "./components/Home/Home";
import { useSelector } from "react-redux";
//Interface for State
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
function App() {
  const isloggedin = useSelector((state: Statetype) => state.user.isloggedin);

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home"></Navigate>}></Route>
          <Route
            path="/home"
            element={isloggedin ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/signup"
            element={!isloggedin ? <Signuppage /> : <Navigate to="/" />}
          ></Route>
          <Route
            path="/login"
            element={!isloggedin ? <Loginpage /> : <Navigate to="/" />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
