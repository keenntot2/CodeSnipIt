import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import _ from "lodash";

const apiClient = new APIClient<null>("/refresh-token");

export const REFRESH_TOKEN_LIFETIME = 4 * 60 * 1000; // 4 minutes

const useRefreshToken = (isSuccess: boolean) =>
  useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => setTimeout(() => apiClient.get(), REFRESH_TOKEN_LIFETIME),
    refetchInterval: REFRESH_TOKEN_LIFETIME,
    refetchIntervalInBackground: true,
    staleTime: REFRESH_TOKEN_LIFETIME,
    enabled: isSuccess,
  });

export default useRefreshToken;
