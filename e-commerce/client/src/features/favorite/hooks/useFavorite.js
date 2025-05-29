import { useQuery } from "@tanstack/react-query";
import { fetchFavorite } from "../api/favoriteApi";

export function useFavorite() {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["favorites"],
    queryFn: fetchFavorite,
    enabled: !!token,
  });
}
