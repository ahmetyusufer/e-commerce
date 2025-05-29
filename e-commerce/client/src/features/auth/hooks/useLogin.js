import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth";

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
    },
  });
}
