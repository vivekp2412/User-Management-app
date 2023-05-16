import { ErrorMessage, Field, Form, Formik } from "formik";
import { Navigate, useNavigate } from "react-router";
import * as yup from "yup";
import "../Signup/Signuppage.css";
interface formdata {
  email: string;
  password: string;
}
const initialValues = {
  email: "",
  password: "",
};
function onSubmit(values) {
  console.log(values);
}
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Required !")
    .min(15, "Atleast 15 Chars required"),
  email: yup.string().email("Invalid Email").required("Required"),
  password: yup.string().required("Required !"),
  confirmpassword: yup
    .string()
    .required("Required !")
    .oneOf([yup.ref("password"), ""], "Password match not found"),
  phonenumber: yup
    .string()
    .matches(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Invalid phone number")
    .required("Phone number is required !"),
});

function Signupform() {
  const navigate = useNavigate();
  function navigateToSignup() {
    navigate("/Signup");
  }
  return (
    <>
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
    </>
  );
}

export default Signupform;
