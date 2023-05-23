import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import * as yup from "yup";
import "./Signuppage.css";
import { loginUser, signinUser } from "../../slices/userSlices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { openEye } from "../../assets/eye-open.png";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

//Interface to User data
interface Usertype {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  phonenumber: string;
  profile: string;
}
//Initial Value for Signup Form
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
  phonenumber: "+91",
  profile: "",
};
//Image type validation function
function checkIfFilesAreCorrectType(files: File): boolean {
  let valid = true;
  if (files) {
    if (!["image/jpg", "image/jpeg", "image/png"].includes(files.type)) {
      valid = false;
    }
  }
  return valid;
}
//Image size validation function
function checkIfFilesAreTooBig(files: File): boolean {
  let valid = true;
  if (files) {
    const size = files.size / 1024 / 1024;
    if (size > 2) {
      valid = false;
    }
  }
  return valid;
}
//Validation Schema for signup form
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name Required !")
    .min(15, "Atleast 15 Chars required"),
  email: yup.string().email("Invalid Email").required("Email Required"),
  password: yup
    .string()
    .required("Password Required !")
    .min(8, "Password Must be of 8 Character"),
  confirmpassword: yup
    .string()
    .required("Confirm password Field Required !")
    .oneOf([yup.ref("password"), ""], "Password match not found"),
  phonenumber: yup
    .string()
    .matches(
      /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
      "Invalid Indian phone number"
    )
    .required("Phone Number Required !"),
  profile: yup
    .mixed()
    .required(" Image Required !")
    .test(
      "FILE_TYPE",
      "Invalid File Format! (Only Png,jpeg,jpg allowed)",
      (value) => {
        if (value instanceof File && checkIfFilesAreCorrectType(value)) {
          return true;
        }
        return false;
      }
    )
    .test("FILE_SIZE", "Too Big! Image only upto 2mb allowed", (value) => {
      if (value instanceof File && checkIfFilesAreTooBig(value)) {
        return true;
      }
      return false;
    }),
});
//Sign up form
function Signupform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgref: React.MutableRefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);
  const [imgUrl, setImgurl] = useState<string>("")!;
  const [showprevimg, setShowprevimg] = useState(false);
  const [userExist, setUserexist] = useState(false);
  const [showpassword, setShowPassword] = useState("password");
  //function redirecting to login
  function navigateToLogin() {
    navigate("/login");
  }
  //Signup form Submit handler
  function onSubmit(values: Usertype, { resetForm }: FormikHelpers<Usertype>) {
    let userList: Usertype[] =
      JSON.parse(localStorage.getItem("userList")!) || [];
    setUserexist(false);
    let user = userList.filter((user) => user.email === values.email);

    if (user.length != 0) {
      setUserexist(true);
      toast.error("User Already exist", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => setUserexist(false), 2000);
    } else {
      values.profile = imgUrl;
      dispatch(signinUser(values));
      navigate("/");
      dispatch(loginUser({ email: values.email, password: values.password }));
      imgref.current!.value = "";
      resetForm();
      setImgurl("");
    }
  }
  //show-hide password Toggler
  function togglepassword() {
    if (showpassword == "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  }
  return (
    <div>
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
                <img className="prev-img" src={imgUrl}></img>
                <label htmlFor="profile" className="form-label center">
                  + Photo
                </label>
                <input
                  ref={imgref}
                  type="file"
                  name="profile"
                  id="profile"
                  hidden
                  className="form-field"
                  onChange={(e) => {
                    setShowprevimg(true);
                    let image = e.target.files![0];
                    formik.setFieldValue("profile", image);
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files![0]);
                    reader.addEventListener("load", () => {
                      if (typeof reader.result === "string") {
                        setImgurl(reader.result);
                      }
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
              <div className="form-control password-field">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Field
                  type={showpassword}
                  name="password"
                  id="password"
                  className="form-field"
                  placeholder="Enter Your Password"
                  autoComplete="on"
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
              <div className="form-control">
                <label htmlFor="confirmpassword" className="form-label">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  className="form-field"
                  placeholder="Confirm password"
                  autoComplete="on"
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
                  type="text"
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
    </div>
  );
}

export default Signupform;
