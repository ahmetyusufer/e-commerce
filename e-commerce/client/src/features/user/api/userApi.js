import axiosInstance from "../../../lib/axios";

export async function getCurrentUser() {
  const res = axiosInstance.get("/users/me");

  return (await res).data;
}
//address
export async function getUserAddress() {
  const res = await axiosInstance.get("users/address");
  return res.data;
}

export async function getUserAdressById(addressId) {
  const res = await axiosInstance.get(`users/address/${addressId}`);
  return res.data;
}

export async function addUserAddress(addressData) {
  const res = await axiosInstance.post(`/users/address`, addressData);
  return res.data;
}

export async function updateUserAddress(addressId, addressData) {
  const res = await axiosInstance.patch(
    `/users/address/${addressId}`,
    addressData
  );
  return res.data;
}

//cards
export async function getUserCard() {
  const res = await axiosInstance.get("/users/card");
  return res.data;
}
export async function addUserCard(cardData) {
  const res = await axiosInstance.patch("/users/card", cardData);
  return res.data;
}

export async function getUserCardById(cardId) {
  const res = await axiosInstance.get(`users/card/${cardId}`);
  return res.data;
}

export async function updateUserCard(cardId, cardData) {
  const res = await axiosInstance.patch(`/users/card/${cardId}`, cardData);
  return res.data;
}
