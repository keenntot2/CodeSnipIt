import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { User } from "./useUser";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";

interface NameMutate {
  firstName: string;
  lastName: string;
}

interface UserContext {
  user?: User;
}

const usePatchAccountName = () => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<NameMutate>("/account/patch/name");
  const toast = useToast();

  return useMutation<undefined, AxiosError, NameMutate, UserContext>({
    mutationKey: ["patch-account-name"],
    mutationFn: (data) => {
      const controller = new AbortController();
      const signal = controller.signal;
      return apiClient.patch(data, { signal });
    },
    onMutate: (variables) => {
      const user = queryClient.getQueryData<User>(["user"]);
      queryClient.setQueryData<User>(["user"], (user) => ({
        ...(user || ({} as User)),
        first_name: variables.firstName,
        last_name: variables.lastName,
      }));
      return { user };
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
    onError: (_error, _variables, context) => {
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
      if (!context?.user) return;
      queryClient.setQueryData<User>(["user"], context.user);
    },
  });
};

export default usePatchAccountName;
