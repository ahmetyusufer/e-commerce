import { useMutation } from "@tanstack/react-query";
import { register } from "../api/auth";

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem("userId", data.userId);
    },
  });
}
