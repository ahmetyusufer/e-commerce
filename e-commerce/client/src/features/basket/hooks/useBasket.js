import { useQuery } from "@tanstack/react-query";
import { basketApi } from "../api/basketApi";

export function useBasket() {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["basket"],
    queryFn: basketApi,
    enabled: !!token,
  });
}
