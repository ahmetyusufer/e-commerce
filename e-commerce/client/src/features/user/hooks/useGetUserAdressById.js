import { useQuery } from "@tanstack/react-query";
import { getUserAdressById } from "../api/userApi";

export function useGetUserAddressById(addressId) {
  return useQuery({
    queryKey: ["address", addressId],
    queryFn: () => getUserAdressById(addressId),
    enabled: !!addressId,
  });
}
