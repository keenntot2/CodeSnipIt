import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("/logout");

const useLogout = () =>
  useMutation({
    mutationFn: apiClient.post,
  });

export default useLogout;
