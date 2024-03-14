import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

interface User {
  username: string;
  password: string;
}

const apiClient = new APIClient<User>("/login");

const useAuth = () =>
  useMutation({
    mutationFn: apiClient.post,
  });

export default useAuth;
