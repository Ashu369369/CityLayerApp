import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import preferencesreducer from "./slices/preferencesSlice"; // Import the preferences reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    preferences: preferencesreducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>; // Type for the entire state
export type AppDispatch = typeof store.dispatch; // Type for dispatch

export default store;
