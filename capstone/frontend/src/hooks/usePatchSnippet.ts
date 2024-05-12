import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import fetchAllResponse from "../entities/FetchAllResponse";
import APIClient from "../services/apiClient";
import { Snippet } from "./useAddSnippet";
import getDateTimeNow from "../utils/getDateTimeNow";

export interface PatchSnippetMutate {
  title: string;
  code: string;
}

interface PrevSnippetsContext {
  prevSnippets: fetchAllResponse<Snippet> | undefined;
}

const usePatchSnippet = (slug?: string) => {
  const apiClient = new APIClient<PatchSnippetMutate, Snippet>(
    `/snippet/${slug}`
  );
  const queryClient = useQueryClient();

  return useMutation<
    Snippet,
    AxiosError,
    PatchSnippetMutate,
    PrevSnippetsContext
  >({
    mutationFn: apiClient.patch,
    onMutate: (variables) => {
      const prevSnippets = queryClient.getQueryData<fetchAllResponse<Snippet>>([
        "snippets",
      ]);

      queryClient.setQueryData<fetchAllResponse<Snippet>>(
        ["snippets"],
        (snippets) => ({
          ...(snippets || ({} as fetchAllResponse<Snippet>)),
          results:
            snippets?.results.map((s) => {
              if (s.slug === slug) {
                return {
                  ...s,
                  title: variables.title,
                  code: variables.code,
                  edited_at: getDateTimeNow(),
                };
              }
              return s;
            }) || [],
        })
      );

      return { prevSnippets };
    },
    onError: (_error, _variables, context) => {
      if (!context?.prevSnippets) return;
      queryClient.setQueryData<fetchAllResponse<Snippet>>(
        ["snippets"],
        context.prevSnippets
      );
    },
  });
};

export default usePatchSnippet;
