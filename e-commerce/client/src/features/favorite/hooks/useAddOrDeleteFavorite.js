import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrDeleteFavorite } from "../api/favoriteApi";

export function useAddOrDeleteFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrDeleteFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
    },
  });
}
