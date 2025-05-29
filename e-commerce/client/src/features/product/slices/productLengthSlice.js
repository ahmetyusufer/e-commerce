import { createSlice } from "@reduxjs/toolkit";

const productLengthSlice = createSlice({
  name: "productLength",
  initialState: {
    favoriteQuantity: "",
    basketQuantity: "",
  },
  reducers: {
    setFavoriteQuantity: (state, action) => {
      state.favoriteQuantity = action.payload;
    },
    setBasketQuantity: (state, action) => {
      state.basketQuantity = action.payload;
    },
    resetQuantities: (state) => {
      state.favoriteQuantity = "";
      state.basketQuantity = "";
    },
  },
});

export const { setFavoriteQuantity, setBasketQuantity, resetQuantities } =
  productLengthSlice.actions;
export default productLengthSlice.reducer;
