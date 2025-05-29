import { addUserAddress } from "../api/userApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSetUserAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries(["address"]);
    },
  });
}
