import { useQuery } from "@tanstack/react-query";
import { getUserCard } from "../api/userApi";
export function useGetUserCard() {
  return useQuery({
    queryKey: ["cards"],
    queryFn: getUserCard,
  });
}
