import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  fontSize: "small" | "medium" | "large";
  highContrast: boolean;
}

const initialState: PreferencesState = {
  fontSize: "medium",
  highContrast: false,
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setFontSize(state, action: PayloadAction<"small" | "medium" | "large">) {
      state.fontSize = action.payload;
    },
    // IMPORTANT: Note the PayloadAction<boolean> here
    toggleHighContrast(state, action: PayloadAction<boolean>) {
      state.highContrast = action.payload;
    },
  },
});

export const { setFontSize, toggleHighContrast } = preferencesSlice.actions;

export default preferencesSlice.reducer;
