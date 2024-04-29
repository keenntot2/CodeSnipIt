import { useMutation, useQueryClient } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import fetchAllResponse from "../entities/FetchAllResponse";
import { Snippet } from "./useAddSnippet";
import { AxiosError } from "axios";

interface VariablesProp {
  [k: string]: string | undefined;
}

interface SnippetsContext {
  snippetsContext: fetchAllResponse<Snippet> | undefined;
}

const useDeleteSnippet = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, VariablesProp, SnippetsContext>({
    mutationFn: (data) => {
      const apiClient = new APIClient(`/delete-snippet/${data.slug}`);
      return apiClient.delete();
    },
    onMutate: (data) => {
      const snippetsContext = queryClient.getQueryData<
        fetchAllResponse<Snippet>
      >(["snippets"]);
      queryClient.setQueryData<fetchAllResponse<Snippet>>(
        ["snippets"],
        (snippetData) => ({
          ...(snippetData || ({} as fetchAllResponse<Snippet>)),
          results:
            snippetData?.results.filter((s) => s.slug != data.slug) || [],
        })
      );
      return { snippetsContext };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData<fetchAllResponse<Snippet>>(
        ["snippets"],
        context?.snippetsContext
      );
    },
  });
};

export default useDeleteSnippet;
