import { useMutation, useQueryClient } from "@tanstack/react-query";
import { decrementBasketItem } from "../api/basketApi";

export function useDecrementBasketItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: decrementBasketItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["basket"]);
    },
  });
}
