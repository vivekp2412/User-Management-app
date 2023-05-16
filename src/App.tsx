import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import image from "../src/assets/signupimage.png";
import Signuppage from "./components/Signup/Signuppage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Loginpage";
import Loginpage from "./components/Login/Loginpage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signuppage />,
  },
  {
    path: "/signup",
    element: <Signuppage />,
  },
  {
    path: "/login",
    element: <Loginpage />,
  },
]);
function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
