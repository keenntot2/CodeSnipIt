import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import fetchAllResponse from "../entities/FetchAllResponse";
import APIClient from "../services/apiClient";
import { Snippet } from "./useAddSnippet";

export interface VariablesProp {
  [k: string]: string | undefined;
}

interface SnippetsContext {
  snippetsContext: fetchAllResponse<Snippet> | undefined;
}

const useDeleteSnippet = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError, VariablesProp, SnippetsContext>({
    mutationFn: (data) => {
      const apiClient = new APIClient(`/snippet/${data.slug}`);
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
      if (!context?.snippetsContext) return;
      queryClient.setQueryData<fetchAllResponse<Snippet>>(
        ["snippets"],
        context?.snippetsContext
      );
    },
  });
};

export default useDeleteSnippet;
