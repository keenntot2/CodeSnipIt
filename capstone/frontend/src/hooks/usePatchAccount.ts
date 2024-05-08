import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { User } from "./useUser";
import { AxiosError } from "axios";

interface NameMutate {
  firstName: string;
  lastName: string;
}

interface UserContext {
  user?: User;
}

const usePatchAccount = (info: string) => {
  const queryClient = useQueryClient();
  const apiClient = new APIClient<NameMutate>(`/account/patch/${info}`);

  return useMutation<undefined, AxiosError, NameMutate, UserContext>({
    mutationKey: ["patch-account"],
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
    onError: (_error, _variables, context) => {
      if (!context?.user) return;
      queryClient.setQueryData<User>(["user"], context.user);
    },
  });
};

export default usePatchAccount;
