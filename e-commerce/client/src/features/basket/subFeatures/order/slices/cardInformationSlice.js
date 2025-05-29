import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardName: "",
  cardNumber: "",
  ccv: "",
  cardLastDate: "",
};
const cardInformationSlice = createSlice({
  name: "cardInformation",
  initialState,
  reducers: {
    setCardData: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetCardData: () => initialState,
  },
});

export const { setCardData, resetCardData } = cardInformationSlice.actions;

export default cardInformationSlice.reducer;
