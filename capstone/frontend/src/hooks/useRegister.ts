import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Register {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmationPassword: string;
}

const apiClient = new APIClient<Register>("/register");

const useRegister = () => {
  const toast = useToast();
  const navigate = useNavigate();
  return useMutation<undefined, AxiosError, Register>({
    mutationFn: apiClient.post,
    onSuccess: () => {
      setTimeout(() => {
        toast({
          title: "Account setup is complete.",
          description: "You'll be guided to the login page in a moment.",
          status: "success",
          duration: 2000,
          position: "top",
          onCloseComplete: () => navigate("/login"),
        });
      }, 500);
    },
  });
};

export default useRegister;
