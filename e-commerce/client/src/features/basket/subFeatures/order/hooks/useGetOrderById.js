import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../api/orderApi";
import { useParams } from "react-router";
export function useGetOrderById() {
  const { id } = useParams();
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => getOrderById(id),
  });
}
