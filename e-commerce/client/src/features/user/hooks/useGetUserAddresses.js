import { useQuery } from "@tanstack/react-query";
import { getUserAddress } from "../api/userApi";

export function useGetUserAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getUserAddress,
  });
}
