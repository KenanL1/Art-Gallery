import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface themeState {
  darkMode: boolean;
}

const darkMode: boolean = localStorage.getItem("darkMode") == "true";
const initialState: themeState = { darkMode };

if (darkMode) window.document.documentElement.classList.add("dark");

// add darkMode preference to browser local storage
const setLocalStorage = (useDarkMode: boolean) => {
  localStorage.setItem("darkMode", useDarkMode.toString());
};

// remove darkMode preference from browser local storage
const clearLocalStorage = () => {
  localStorage.removeItem("darkMode");
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchMode: (state: themeState) => {
      state.darkMode = !state.darkMode;
      setLocalStorage(state.darkMode);
      if (state.darkMode) window.document.documentElement.classList.add("dark");
      else window.document.documentElement.classList.remove("dark");
    },
    removeTheme: (state: themeState) => {
      clearLocalStorage();
    },
  },
});

export const { switchMode, removeTheme } = themeSlice.actions;
export const selectDarkMode = (state: RootState) => state.theme.darkMode;

export default themeSlice.reducer;
