import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

interface User {
  username: string;
  password: string;
}

const apiClient = new APIClient<User>("/login");

const useAuth = () =>
  useMutation({
    mutationFn: (data: User) => {
      const controller = new AbortController();
      const signal = controller.signal;
      return apiClient.post(data, { signal });
    },
    onSuccess: () => {
      document.cookie = `isLoggedIn=true; max-age=${5 * 60}; path:/`;
    },
  });

export default useAuth;
