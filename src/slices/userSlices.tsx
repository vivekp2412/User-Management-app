import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("userData")) || {
  isloggedin: false,
  userinfo: {},
};
const userList = JSON.parse(localStorage.getItem("userList"));
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      console.log(action);
      userList.map((user) => {
        if (user.email === action.payload.email) {
          state.userinfo = user;
          state.isloggedin = true;
        }
      });
      localStorage.setItem("userData", JSON.stringify(state));
    },
    logoutUser(state) {
      console.log("logged out");
      (state.userinfo = {}), (state.isloggedin = false);
      console.log(state.userinfo);
      localStorage.setItem("userData", JSON.stringify(state));
    },
  },
});
export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
