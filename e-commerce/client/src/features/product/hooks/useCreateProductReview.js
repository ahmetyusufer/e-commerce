import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProductReview } from "../api/productApi";

export function useCreateProductReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["review"]);
    },
  });
}
