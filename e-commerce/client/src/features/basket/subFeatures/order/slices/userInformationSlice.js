import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};
const userInformationSlice = createSlice({
  name: "userInformation",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUserData: () => {
      initialState;
    },
  },
});

export const { setUserData, resetUserData } = userInformationSlice.actions;

export default userInformationSlice.reducer;
