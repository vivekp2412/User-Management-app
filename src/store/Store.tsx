import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlices";
//Store Config
const Store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default Store;
