import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for the entire state
export type AppDispatch = typeof store.dispatch; // Type for dispatch

export default store;
