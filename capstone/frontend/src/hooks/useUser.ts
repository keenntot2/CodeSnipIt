import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { REFRESH_TOKEN_LIFETIME } from "./useRefreshToken";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

const apiClient = new APIClient<User>("/user");

const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: apiClient.get,
    retry: false,
    staleTime: REFRESH_TOKEN_LIFETIME, // 4ms
  });

export default useUser;
