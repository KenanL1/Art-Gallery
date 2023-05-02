import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface authState {
  user: string | null;
  username: string | null;
  isLoggedIn: boolean;
}

const user: any = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: authState = user.user
  ? { user: user.user, username: user.username, isLoggedIn: true }
  : { user: null, username: null, isLoggedIn: false };

interface action {
  type: string;
  payload: any;
}

// add user auth object to browser local storage
const setLocalStorage = (respObj: any) => {
  localStorage.setItem("user", JSON.stringify(respObj));
};

// remove user auth object from browser local storage
const clearLocalStorage = () => {
  localStorage.removeItem("user");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: authState, action: action) => {
      setLocalStorage(action.payload);
      state.user = action.payload.user;
      state.username = action.payload.username;
      state.isLoggedIn = true;
    },
    logout: (state: authState) => {
      clearLocalStorage();
      state.user = null;
      state.username = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
