import axiosInstance from "../../../lib/axios";

const BASE_URL = "/users/favorites";

export async function fetchFavorite() {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
}

export async function addOrDeleteFavorite(productId) {
  const res = await axiosInstance.post(BASE_URL, { productId });
  return res.data;
}

export async function clearFavorite() {
  const res = await axiosInstance.delete(`${BASE_URL}/all`);
  return res.data;
}
