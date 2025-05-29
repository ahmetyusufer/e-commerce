import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/slices/authSlice";
import productReviewReducer from "./features/product/slices/productReviewSlice";
import productLengthReducer from "./features/product/slices/productLengthSlice";
import userInformationReducer from "./features/basket/subFeatures/order/slices/userInformationSlice";
import addressInformationReducer from "./features/basket/subFeatures/order/slices/addressInformationSlice";
import orderStepperReducer from "./features/basket/subFeatures/order/slices/orderStepperSlice";
import cardInformationReducer from "./features/basket/subFeatures/order/slices/cardInformationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    productReview: productReviewReducer,
    productLength: productLengthReducer,
    userInformation: userInformationReducer,
    addressInformation: addressInformationReducer,
    orderStepper: orderStepperReducer,
    cardInformation: cardInformationReducer,
  },
});
