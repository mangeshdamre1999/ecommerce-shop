import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSlice } from "../../models/AuthSlice";

interface LoginProps {
  username: string;
  password: string;
}

/**
 * Demo credentials. There is no auth server behind this storefront, so the
 * check runs client-side — fine for a demo, not something to ship. A real
 * build would post these to a backend and store a signed token instead.
 */
export const DEMO_USER = {
  username: "harshu",
  password: "mangesh",
};

const initialState: AuthSlice = {
  isLoggedIn:
    localStorage.getItem("username") !== null &&
    localStorage.getItem("username") !== undefined &&
    localStorage.getItem("username") !== "",
  modalOpen: false,
  username: localStorage.getItem("username") ?? "",
  loginError: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    updateModal: (state, action: PayloadAction<boolean>) => {
      return { ...state, modalOpen: action.payload, loginError: false };
    },
    doLogin: (state, action: PayloadAction<LoginProps>) => {
      const { username, password } = action.payload;
      if (
        username.trim().toLowerCase() === DEMO_USER.username &&
        password === DEMO_USER.password
      ) {
        localStorage.setItem("username", DEMO_USER.username);
        return {
          ...state,
          username: DEMO_USER.username,
          modalOpen: false,
          isLoggedIn: true,
          loginError: false,
        };
      }
      // Wrong credentials used to fail silently, which reads as a broken form.
      return { ...state, loginError: true };
    },
    doLogout: (state) => {
      localStorage.removeItem("username");
      return { ...state, username: "", isLoggedIn: false, loginError: false };
    },
  },
});

export const { updateModal, doLogin, doLogout } = authSlice.actions;
export default authSlice.reducer;
