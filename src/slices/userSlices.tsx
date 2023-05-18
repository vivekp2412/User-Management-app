import { createSlice } from "@reduxjs/toolkit";
interface Usertype {
  name: string;
  email: string;
  password: string;
  phonenumber: string;
  profile: string;
}
const initialState = JSON.parse(localStorage.getItem("userData")!) || {
  isloggedin: false,
  userinfo: {},
};
const userList: Usertype[] =
  JSON.parse(localStorage.getItem("userList")!) || [];
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      userList.map((user: Usertype) => {
        if (user.email === action.payload.email) {
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
