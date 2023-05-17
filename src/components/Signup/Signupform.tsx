import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import * as yup from "yup";
import "./Signuppage.css";
interface formdata {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  phonenumber: number;
}
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
  phonenumber: "",
  profile: "",
};
const userList = JSON.parse(localStorage.getItem("userList")) || [];

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
  profile: yup
    .mixed()
    .required("Required !")
    .test(
      "FILE_FORMAT",
      "invalid !",
      (value) => ["image/png", "image/jpeg", "image/jpg"].includes[value.type]
    )
    .test("FILE_SIZE", "TOO BIG", (value) => value.size <= 2 * 1024 * 1024),
});

function Signupform() {
  const navigate = useNavigate();
  const imgref = useRef();
  const [imgUrl, setImgurl] = useState();
  function navigateToLogin() {
    navigate("/login");
  }
  function onSubmit(values, { resetForm }) {
    userList.push(values);
    localStorage.setItem("userList", JSON.stringify(userList));
    resetForm();
    imgref.current.value = null;
    setImgurl("");
  }
  return (
    <>
      <div className="form-title">Sign up</div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <div className="form-control">
                <label htmlFor="profile" className="form-label center">
                  + Photo
                </label>
                <img src={imgUrl}></img>
                <input
                  ref={imgref}
                  type="file"
                  name="profile"
                  id="profile"
                  size={0.05 * 1024 * 1024}
                  // hidden
                  className="form-field"
                  onChange={(e) => {
                    let image = e.target.files![0];
                    formik.setFieldValue("profile", image);
                    let reader = new FileReader();
                    reader.readAsDataURL(image);
                    reader.addEventListener("load", () => {
                      setImgurl(reader.result);
                    });
                  }}
                />
                <ErrorMessage name="profile">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-control">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="form-field"
                  placeholder="Enter your name"
                />
                <ErrorMessage name="name">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
              </div>
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
                  placeholder="Enter Your Password"
                />
                <ErrorMessage name="password">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-control">
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  type="text"
                  name="confirmpassword"
                  id="confirmpassword"
                  className="form-field"
                  placeholder="Confirm password"
                />
                <ErrorMessage name="confirmpassword">
                  {(msg) => <div className="error-message">{msg}</div>}
                </ErrorMessage>
              </div>
              <div className="form-control">
                <label htmlFor="phonenumber" className="form-label">
                  Phone number
                </label>
                <Field
                  type="number"
                  name="phonenumber"
                  id="phonenumber"
                  className="form-field"
                  placeholder="Enter your Phone Number"
                />
                <ErrorMessage name="phonenumber">
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
        Already Have a Account?{" "}
        <a className="nav-link" onClick={navigateToLogin}>
          Login
        </a>
      </p>
    </>
  );
}

export default Signupform;
