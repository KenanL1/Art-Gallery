import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface authState {
  user: any;
  isLoggedIn: boolean;
}

const user: any = JSON.parse(localStorage.getItem("user") || "{}");

const initialState: authState = user.username
  ? { user: user.username, isLoggedIn: true }
  : { user: null, isLoggedIn: false };

interface action {
  type: string;
  payload: any;
}

const setLocalStorage = (respObj: any) => {
  localStorage.setItem("user", JSON.stringify(respObj));
};

const clearLocalStorage = () => {
  localStorage.removeItem("user");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state: authState, action: action) => {
      setLocalStorage(action.payload);
      state.user = action.payload.username;
      state.isLoggedIn = true;
    },
    logout: (state: authState) => {
      clearLocalStorage();
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
