import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    name: "",
    email: "",
    password: "",
    passwordIsEqual: "",
    isLogin: false,
  },

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordIsEqual: (state, action) => {
      state.passwordIsEqual = action.payload;
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    resetAuthData: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.passwordIsEqual = "";
      state.isLogin = "";
    },
  },
});

export const {
  setName,
  setEmail,
  setPassword,
  setPasswordIsEqual,
  setIsLogin,
  resetAuthData,
} = authSlice.actions;
export default authSlice.reducer;
