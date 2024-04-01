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
  useMutation<Register, AxiosError, Register>({
    mutationFn: apiClient.post,
    onSuccess: (data) => console.log(data),
  });

export default useRegister;
