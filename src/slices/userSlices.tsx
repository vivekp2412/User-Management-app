import { createSlice } from "@reduxjs/toolkit";
//Interface for userdata
interface Usertype {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  profile: string;
  confirmpassword: string;
}
//Initial state from Local Storage
const initialState = JSON.parse(localStorage.getItem("userData")!) || {
  isloggedin: false,
  userinfo: {},
};
let userList: Usertype[] = JSON.parse(localStorage.getItem("userList")!) || [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      userList.map((user: Usertype) => {
        if (
          user.email === action.payload.email &&
          user.password == action.payload.password
        ) {
          state.userinfo = user;
          state.isloggedin = true;
        }
      });
      localStorage.setItem("userData", JSON.stringify(state));
    },
    logoutUser(state) {
      (state.userinfo = {}), (state.isloggedin = false);
      localStorage.setItem("userData", JSON.stringify(state));
    },
    signinUser(state, action) {
      userList.push(action.payload);
      localStorage.setItem("userList", JSON.stringify(userList));
    },
  },
});
export const { loginUser, logoutUser, signinUser } = userSlice.actions;
export default userSlice.reducer;
