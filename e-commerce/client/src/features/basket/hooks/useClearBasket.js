import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearBasket } from "../api/basketApi";

export function useClearBasket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearBasket,
    onSuccess: () => {
      queryClient.invalidateQueries(["basket"]);
    },
  });
}
