import axiosInstance from "../../../lib/axios";

const BASE_URL = "/users/basket";

export async function basketApi() {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
}

export async function addBasket(productId) {
  const res = await axiosInstance.post(BASE_URL, { productId });
  return res.data;
}

export async function deleteBasketItem(productId) {
  const res = await axiosInstance.delete(BASE_URL, { data: { productId } });
  return res.data;
}

export async function decrementBasketItem(productId) {
  const res = await axiosInstance.patch(BASE_URL, { productId });
  return res.data;
}

export async function clearBasket(productId) {
  const res = await axiosInstance.delete(`${BASE_URL}/all`, {
    data: { productId },
  });
  return res.data;
}
