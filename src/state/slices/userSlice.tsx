import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  username: null,
  email: null,
  dob: null,
  role: 1,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.dob = action.payload.dob;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.username = null;
      state.email = null;
      state.dob = null;
      state.role = 1;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
