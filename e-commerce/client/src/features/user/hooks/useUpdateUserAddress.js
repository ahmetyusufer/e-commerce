import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserAddress } from "../api/userApi";

export function useUpdateUserAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ addressId, addressData }) =>
      updateUserAddress(addressId, addressData),
    onSuccess: () => queryClient.invalidateQueries(["address"]),
  });
}
