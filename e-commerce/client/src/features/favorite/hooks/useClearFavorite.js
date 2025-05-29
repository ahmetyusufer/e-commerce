import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearFavorite } from "../api/favoriteApi";

export function useClearFavorite() {
  const queyClient = useQueryClient();
  return useMutation({
    mutationFn: clearFavorite,
    onSuccess: () => {
      queyClient.invalidateQueries(["favorite"]);
    },
  });
}
