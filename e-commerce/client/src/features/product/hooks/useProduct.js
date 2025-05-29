import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/productApi";

export function useProduct(productId) {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
  });
}
