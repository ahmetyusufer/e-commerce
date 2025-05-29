import axiosInstance from "../../../../../lib/axios";

const BASE_URL = "/users/order";

export async function getOrderById(orderId) {
  const res = await axiosInstance.get(`${BASE_URL}/${orderId}`);
  return res.data;
}

export async function getOrderAll() {
  const res = await axiosInstance.get(`${BASE_URL}/all`);
  return res.data;
}

export async function createOrder(orderData) {
  const res = await axiosInstance.post(BASE_URL, orderData);
  return res.data;
}
