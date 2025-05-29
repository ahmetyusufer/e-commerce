// hooks/useGetCurrentUser.js
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/userApi";

export function useGetCurrentUser() {
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: !!token, // token varsa fetch et
  });
}
