import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlices";
const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default Store;
