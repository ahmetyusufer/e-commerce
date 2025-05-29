import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addressName: "",
  street: "",
  city: "",
  district: "",
  postalCode: "",
  country: "",
};

const addressInformationSlice = createSlice({
  name: "addressInformation",
  initialState,
  reducers: {
    setAddressData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetAddressData: () => {
      initialState;
    },
  },
});

export const { setAddressData, resetAddressData } =
  addressInformationSlice.actions;

export default addressInformationSlice.reducer;
