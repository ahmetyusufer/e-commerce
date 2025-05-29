import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBasketItem } from "../api/basketApi";

export function useDeleteBasketItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBasketItem,
    onSuccess: () => queryClient.invalidateQueries(["basket"]),
  });
}
