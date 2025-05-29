import { useQuery } from "@tanstack/react-query";
import { getOrderAll } from "../api/orderApi";

export function useGetOrderAll() {
  const token = localStorage.getItem("token");
  return useQuery({
    queryKey: ["order"],
    queryFn: getOrderAll,
    enabled: !!token,
  });
}
