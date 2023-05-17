import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { Navigate, useNavigate } from "react-router";
import * as yup from "yup";
import "../Signup/Signuppage.css";
import { loginUser } from "../../slices/userSlices";
import { useDispatch } from "react-redux";
import { useState } from "react";
interface formdata {
  email: string;
  password: string;
}
const initialValues = {
  email: "",
  password: "",
};
const validationSchema = yup.object().shape({
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().required("Required !"),
});
function Loginform() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invalidcredentials, setInvalidcredentials] = useState(false);
  function navigateToSignup() {
    navigate("/Signup");
  }

  function onSubmit(values, { resetForm }) {
    let userList = JSON.parse(localStorage.getItem("userList"));
    let user = userList.filter(
      (user) => user.email === values.email && user.password === values.password
    );
    if (user.length != 0) {
      dispatch(loginUser(values));
      navigate("/");
    } else {
      setInvalidcredentials(true);
      setTimeout(() => setInvalidcredentials(false), 2000);
      navigate("/login");
    }
    resetForm();
  }
  return (
    <>
      <div className="form-title">Login</div>
      <p
        className={
          invalidcredentials ? "error-message show" : "error-message hide"
        }
      >
        {" "}
        Invalid Credentails
      </p>
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
    </>
  );
}

export default Loginform;
