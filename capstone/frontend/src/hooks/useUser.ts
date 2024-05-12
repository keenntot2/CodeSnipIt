import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/apiClient";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
}

const CHECK_USER_INTERVAL = 5 * 60 * 1000;

const apiClient = new APIClient<User>("/user");

const useUser = () =>
  useQuery<User, AxiosError, User>({
    queryKey: ["user"],
    queryFn: ({ signal }) => apiClient.get({ signal }),
    retry: false,
    refetchOnWindowFocus: false,

    staleTime: CHECK_USER_INTERVAL, // 5mins
  });

export default useUser;
