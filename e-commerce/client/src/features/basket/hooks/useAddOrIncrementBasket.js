import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBasket } from "../api/basketApi";
import toast from "react-hot-toast";

export function useAddOrIncrementBasketItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addBasket,
    onSuccess: () => {
      queryClient.invalidateQueries(["basket"]);
      toast.success("Ürün Sepete Eklendi!");
    },
  });
}
