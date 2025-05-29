import axiosInstance from "../../../lib/axios";

const BASE_URL = "/auth";

export async function register({ name, email, password }) {
  const res = await axiosInstance.post(`${BASE_URL}/register`, {
    name,
    email,
    password,
  });
  return res.data;
}

export async function login({ email, password }) {
  const res = await axiosInstance.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return res.data;
}
