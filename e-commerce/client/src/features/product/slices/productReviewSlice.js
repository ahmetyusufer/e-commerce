import { createSlice } from "@reduxjs/toolkit";

const productReviewSlice = createSlice({
  name: "productReview",
  initialState: {
    userName: "",
    point: 0,
    comment: "",
  },

  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPoint: (state, action) => {
      state.point = action.payload;
    },
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    setNullAll: (state) => {
      state.userName = "";
      state.point = 0;
      state.comment = "";
    },
  },
});

export const { setUserName, setPoint, setComment, setNullAll } =
  productReviewSlice.actions;
export default productReviewSlice.reducer;
