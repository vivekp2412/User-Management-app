import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import image from "../src/assets/signupimage.png";
import Signuppage from "./components/Signup/Signuppage";
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

function App() {
  const isloggedin = useSelector((state) => state.user.isloggedin);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
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
