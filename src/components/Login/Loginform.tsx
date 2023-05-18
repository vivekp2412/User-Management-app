import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { Navigate, useNavigate } from "react-router";
import * as yup from "yup";
import "../Signup/Signuppage.css";
import { loginUser } from "../../slices/userSlices";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";

interface Formdata {
  email: string;
  password: string;
}
interface Usertype {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  profile: string;
}

const initialValues = {
  email: "",
  password: "",
};
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Email Required"),
  password: yup
    .string()
    .required("Password Required !")
    .min(8, "Password Must be of 8 Character"),
});
function Loginform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [invalidcredentials, setInvalidcredentials] = useState(false);
  function navigateToSignup() {
    navigate("/Signup");
  }

  function onSubmit(values: Formdata, { resetForm }) {
    let userList: [] = JSON.parse(localStorage.getItem("userList")!);
    let isRegistered: Usertype[] = userList!.filter(
      (user: Usertype) => user.email === values.email
    );
    if (isRegistered.length == 0) {
      toast.error("User not Registered;", {
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
      let user = userList.filter(
        (user: Usertype) =>
          user.email === values.email && user.password === values.password
      );
      if (user.length != 0) {
        dispatch(loginUser(values));
        navigate("/");
        resetForm();
      } else {
        toast.error("Invalid credential;", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setInvalidcredentials(true);
        // setTimeout(() => setInvalidcredentials(false), 2000);
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
              <div className="form-control">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type="text"
                  name="password"
                  id="password"
                  className="form-field"
                  placeholder="Enter your password"
                />
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
