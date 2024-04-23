import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";

interface Username {
  username: string;
}

const apiClient = new APIClient<Username>("/verify-username");

const useVerifyUsername = () =>
  useMutation<undefined, AxiosError, Username>({
    mutationFn: apiClient.post,
    retry: false,
  });

export default useVerifyUsername;
