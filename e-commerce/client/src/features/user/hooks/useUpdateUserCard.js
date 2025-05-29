import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserCard } from "../api/userApi";

export function useUpdateUserCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, cardData }) => updateUserCard(cardId, cardData),
    onSuccess: () => queryClient.invalidateQueries(["card"]),
  });
}
