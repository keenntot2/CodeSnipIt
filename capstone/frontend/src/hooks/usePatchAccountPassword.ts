import { useToast } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/apiClient";

interface PasswordMutate {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const usePatchAccountPassword = () => {
  const apiClient = new APIClient<PasswordMutate>("/account/patch/password");
  const toast = useToast();

  return useMutation<undefined, AxiosError, PasswordMutate>({
    mutationKey: ["patch-account-password"],
    mutationFn: (data) => {
      const controller = new AbortController();
      const signal = controller.signal;
      return apiClient.patch(data, { signal });
    },
    onSuccess: () => {
      toast({
        description: "Your account has been successfully updated.",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          width: { base: "250px", lg: "max-content" },
          minW: "none",
        },
      });
    },
    onError: (error) => {
      const errorExempt = [400, 401];
      if (!errorExempt.includes(error.response?.status || -1)) {
        toast({
          title: "Error",
          description:
            "It seems there has been a problem while updating your account. Please try again later.",
          status: "error",
          duration: 4000,
          position: "top",
          isClosable: true,
          containerStyle: {
            width: { base: "250px", lg: "max-content" },
            minW: "none",
          },
        });
      }
    },
  });
};

export default usePatchAccountPassword;
