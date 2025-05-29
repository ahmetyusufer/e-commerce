import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "react-hot-toast";

import HomePage from "./features/home/HomePage";

import Basket from "./features/basket/components/Basket";
import NavHeader from "./features/ui/NavHeader";
import Register from "./features/auth/components/Register";
import Login from "./features/auth/components/Login";
import ProductDetails from "./features/product/components/ProductDetails";
import Favorite from "./features/favorite/components/Favorite";
import RequireAuth from "./features/ui/RequireAuth";
import Order from "./features/basket/subFeatures/order/components/Order";
import OrderHistory from "./features/basket/subFeatures/order/components/OrderHistory";
import OrderHistoryAll from "./features/basket/subFeatures/order/components/OrderHistoryAll";
import UserAccountDetails from "./features/user/components/UserAccountDetails";
import UserAccountCards from "./features/user/components/cards/UserAccountCards";
import UserAccountAddresses from "./features/user/components/Address/UserAccountAddresses";
import UserUpdateAddress from "./features/user/components/Address/UserupdateAddress";
import UserUpdateCard from "./features/user/components/cards/UserUpdateCard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <NavHeader />
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route
            path="/favorite"
            element={
              <RequireAuth>
                <Favorite />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/basket"
            element={
              <RequireAuth>
                <Basket />
              </RequireAuth>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/order" element={<Order />}></Route>
          <Route path="/order/:id" element={<OrderHistory />}></Route>
          <Route path="/order/all" element={<OrderHistoryAll />}></Route>
          <Route path="/account" element={<UserAccountDetails />}></Route>
          <Route
            path="/account/addresses"
            element={<UserAccountAddresses />}
          ></Route>
          <Route path="/account/cards" element={<UserAccountCards />}></Route>
          <Route
            path="/account/address/:id"
            element={<UserUpdateAddress />}
          ></Route>
          <Route path="/account/card/:id" element={<UserUpdateCard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
