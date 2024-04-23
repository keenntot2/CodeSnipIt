import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";

interface Register {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmationPassword: string;
}

const apiClient = new APIClient<Register>("/register");

const useRegister = () =>
  useMutation<undefined, AxiosError, Register>({
    mutationFn: apiClient.post,
  });

export default useRegister;
