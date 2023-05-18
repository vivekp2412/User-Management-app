import { ErrorMessage, Field, Form, Formik,FormikHelpers,FormikProps } from "formik";
import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import * as yup from "yup";
import "./Signuppage.css";
import { loginUser, signinUser } from "../../slices/userSlices";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface formdata {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
  phonenumber: string;
}
interface MyFormProps extends FormikProps<formdata>{
  reset:()=>{}
}
interface Usertype {
  name: string;
  email: string;
  password: string;
  confirmpassword:string
  phonenumber: string;
  profile: string;
}
// interface Filetype{
//   size:number,
//   name:string,
//   type:string,
//   webkitRelativePath:string,
//   lastModified:number,
//   lastModifiedDate:Date
// }

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
  phonenumber: "",
  profile: "",
};
function checkIfFilesAreCorrectType(files:File): boolean {
  let valid = true;
  if (files) {
    if (!["image/jpg", "image/jpeg", "image/png"].includes(files.type)) {
      valid = false;
    }
  }
  return valid;
}
function checkIfFilesAreTooBig(files:File): boolean {
  console.log(files)
  let valid = true;
  if (files) {
    const size = files.size / 1024 / 1024;
    if (size > 5) {
      valid = false;
    }
  }
  return valid;
}

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
    .matches(/^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/, "Invalid phone number")
    .required("Phone Number Required !"),
  profile: yup
    .mixed()
    .required(" Image Required !")
    .test(
      "FILE_TYPE",
      "Invalid File Format! (Only Png,jpeg,jpg allowed)",
      (value)=>{
        if(value instanceof File){
          return checkIfFilesAreCorrectType(value)
        }
      }
    )
    .test(
      "FILE_SIZE",
      "Too Big! Image only upto 2mb allowed",
      (value)=>{
        if(value instanceof File){
          return checkIfFilesAreTooBig(value)
        }
      }
    ),
});

function Signupform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imgref:React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null);
  const [imgUrl, setImgurl] = useState<string>("")!;
  const [showprevimg, setShowprevimg] = useState(false);
  const [userExist, setUserexist] = useState(false);
  function navigateToLogin() {
    navigate("/login");
  }
  function onSubmit(values: Usertype, { resetForm }:FormikHelpers<Usertype>) {
    let userList: Usertype[] =
      JSON.parse(localStorage.getItem("userList")!) || [];
    setUserexist(false);
    let user = userList.filter((user) => user.email === values.email);
    console.log(user);

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
      console.log("hi");
      values.profile = imgUrl;
      dispatch(signinUser(values));
      navigate("/");
      dispatch(loginUser({ email: values.email, password: values.password }));
      imgref.current!.value = "";
      resetForm();
      setImgurl("");
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
                  size={0.05 * 1024 * 1024}
                  hidden
                  className="form-field"
                  onChange={(e) => {
                    setShowprevimg(true);
                    let image = e.target.files![0];
                    formik.setFieldValue("profile", image);
                    let reader = new FileReader();
                    reader.readAsDataURL(e.target.files![0]);
                    reader.addEventListener("load", () => {
                      if(typeof reader.result ==="string"){
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
