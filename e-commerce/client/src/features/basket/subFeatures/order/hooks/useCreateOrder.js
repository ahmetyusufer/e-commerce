import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder } from "../api/orderApi";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { resetAddressData } from "../slices/addressInformationSlice";
import { resetCardData } from "../slices/cardInformationSlice";
import { resetUserData } from "../slices/userInformationSlice";

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries(["order"]);
      dispatch(resetAddressData());
      dispatch(resetCardData());
      dispatch(resetUserData());
      Swal.fire({
        title: "Siparişiniz başarıyla alındı!",
        icon: "success",
        confirmButtonText: "Tamam",
      }).then(() => {
        navigate("/order/all");
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Bir hata oluştu",
        text: error.response?.data?.message || error.message,
        icon: "error",
        confirmButtonText: "Tamam",
      });
    },
  });
}
