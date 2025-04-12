import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PreferencesState {
  fontSize: "small" | "medium" | "large";
  highContrast: boolean;
  dateFormat: "MM-DD-YYYY" | "YYYY-MM-DD" | "DD-MM-YYYY";
}

const initialState: PreferencesState = {
  fontSize: "medium",
  highContrast: false,
  dateFormat: "MM-DD-YYYY",
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
    setDateFormat(state, action: PayloadAction<"MM-DD-YYYY" | "YYYY-MM-DD" | "DD-MM-YYYY">) {
      state.dateFormat = action.payload;
    },
  },
});

export const { setFontSize, toggleHighContrast, setDateFormat } = preferencesSlice.actions;

export default preferencesSlice.reducer;
