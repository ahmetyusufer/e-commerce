import { createSlice } from "@reduxjs/toolkit";

const orderStepperSlice = createSlice({
  name: "orderStepper",
  initialState: {
    steps: [
      "Kullanıcı Bilgilerin",
      "Adres Bilgilerin",
      "Cart Bilgilerin",
      "Onay",
    ],
    current: 0,
  },
  reducers: {
    setIncreaseCurrent: (state, action) => {
      state.current = state.current + action.payload;
    },
    setDecreaseCurrent: (state, action) => {
      state.current = state.current - action.payload;
    },
  },
});

export const { setIncreaseCurrent, setDecreaseCurrent } =
  orderStepperSlice.actions;

export default orderStepperSlice.reducer;
