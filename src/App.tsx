import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import image from "../src/assets/signupimage.png";
import Signuppage from "./components/Signup/Signuppage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter,
  createBrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./components/Login/Loginpage";
import Loginpage from "./components/Login/Loginpage";
import Home from "./components/Home/Home";
// import Protected from "./Protected";
import { useSelector } from "react-redux";
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
