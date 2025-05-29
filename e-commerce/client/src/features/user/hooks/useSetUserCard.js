import { addUserCard } from "../api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSetUserCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUserCard,
    onSuccess: () => {
      queryClient.invalidateQueries(["card"]);
    },
  });
}
