import { useQuery } from "@tanstack/react-query";
import { getUserCardById } from "../api/userApi";

export function useGetUserCardById(cardId) {
  return useQuery({
    queryKey: ["card", cardId],
    queryFn: () => getUserCardById(cardId),
    enabled: !!cardId,
  });
}
