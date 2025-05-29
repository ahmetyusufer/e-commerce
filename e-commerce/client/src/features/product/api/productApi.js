import axiosInstance from "../../../lib/axios";

const BASE_URL = "/products";

export async function fetchProducts() {
  const res = await axiosInstance.get(BASE_URL);
  return res.data;
}

export async function fetchProductById(id) {
  const res = await axiosInstance.get(`${BASE_URL}/${id}`);
  return res.data;
}

export async function createProductReview({
  productId,
  userName,
  point,
  comment,
}) {
  const res = await axiosInstance.post(`${BASE_URL}/${productId}/review`, {
    userName,
    point,
    comment,
  });
  return res.data;
}
