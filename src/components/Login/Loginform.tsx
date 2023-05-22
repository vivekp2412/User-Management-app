import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Navigate, useNavigate } from "react-router";
import * as yup from "yup";
import "../Signup/Signuppage.css";
import { loginUser } from "../../slices/userSlices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

//Interface for Formdata input
interface Formdata {
  email: string;
  password: string;
}
//Interface for Userdata stored
interface Usertype {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  profile: string;
  confirmpassword: string;
}
// Initial State for Form
const initialValues = {
  email: "",
  password: "",
};
//validationSchema for Login Page
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email Required"),
  password: yup
    .string()
    .required("Password Required !")
    .min(8, "Password Must be of 8 Character"),
});
//Login Form
function Loginform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState("password");

  function navigateToSignup() {
    navigate("/Signup");
  }
  //show-hide password toggler
  function togglepassword() {
    if (showpassword == "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  }
  //login form Submit Handler function
  function onSubmit(values: Formdata, { resetForm }: FormikHelpers<Usertype>) {
    let userList: Usertype[] = JSON.parse(localStorage.getItem("userList")!);
    let isRegistered: Usertype[] = [];
    if (userList != null) {
      isRegistered = userList!.filter(
        (user: Usertype) => user.email === values.email
      );
    }
    if (isRegistered.length == 0) {
      toast.error("User not Registered", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      let userArray: Usertype[] = [];
      if (userList != null) {
        userArray = userList.filter(
          (user: Usertype) =>
            user.email == values.email && user.password == values.password
        );
      }
      if (userArray.length != 0) {
        dispatch(loginUser(values));
        navigate("/");
        resetForm();
      } else {
        toast.error("Invalid credential", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/login");
      }
    }
  }
  return (
    <div>
      <div className="form-title">Login</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <div className="form-control">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  className="form-field"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-control password-field">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type={showpassword}
                  name="password"
                  id="password"
                  className="form-field"
                  placeholder="Enter your password"
                />
                <div className="showpassword" onClick={() => togglepassword()}>
                  <FontAwesomeIcon
                    icon={showpassword == "text" ? faEyeSlash : faEye}
                  />
                </div>
                <ErrorMessage name="password">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <button type="submit" className="button submit">
                Submit
              </button>
              <button type="reset" className="button reset">
                Reset
              </button>
            </Form>
          );
        }}
      </Formik>
      <p className="instruction">
        Don't Have a Account?{" "}
        <a className="nav-link" onClick={navigateToSignup}>
          Signup
        </a>
      </p>
    </div>
  );
}

export default Loginform;
