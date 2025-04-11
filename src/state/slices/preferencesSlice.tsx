import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PreferencesState = {
  fontSize: "small" | "medium" | "large";
  highContrast: boolean;
};

const initialState: PreferencesState = {
  fontSize: "medium", // Default font size
  highContrast: false, // Default contrast mode
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setFontSize: (state, action: PayloadAction<"small" | "medium" | "large">) => {
      state.fontSize = action.payload;
    },
    toggleHighContrast: (state, action: PayloadAction<boolean>) => {
      state.highContrast = action.payload;
    },
  },
});

export const { setFontSize, toggleHighContrast } = preferencesSlice.actions;
export default preferencesSlice.reducer;