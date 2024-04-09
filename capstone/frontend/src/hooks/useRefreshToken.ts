import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const apiClient = new APIClient<null>("/refresh-token");

export const REFRESH_TOKEN_LIFETIME = 4 * 60 * 1000; // 4 minutes

const useRefreshToken = () =>
  useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => apiClient.get(),
    refetchInterval: REFRESH_TOKEN_LIFETIME,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: REFRESH_TOKEN_LIFETIME,
    enabled: false,
  });

export default useRefreshToken;
