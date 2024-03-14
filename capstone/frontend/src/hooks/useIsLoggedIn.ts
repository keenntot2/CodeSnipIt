import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { User } from "./useUser";

const apiClient = new APIClient<User>("/user");

const useIsLoggedIn = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: apiClient.get,
    retry: false,
    refetchOnWindowFocus: false,
  });

export default useIsLoggedIn;
