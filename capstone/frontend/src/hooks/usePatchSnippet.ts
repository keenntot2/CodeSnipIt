import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import fetchAllResponse from "../entities/FetchAllResponse";
import APIClient from "../services/apiClient";
import { Snippet } from "./useAddSnippet";
import useSnippetListStore from "./useSnippetListStore";
import useSnippetStore from "./useSnippetStore";

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
  const udpateSnippets = useSnippetListStore((s) => s.updateSnippet);
  const addSnippets = useSnippetListStore((s) => s.addSnippets);
  const updateSnippet = useSnippetStore((s) => s.udpateSnippet);

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
      updateSnippet(variables);
      udpateSnippets({
        ...(prevSnippets?.results.find((s) => s.slug === slug) ||
          ({} as Snippet)),
        title: variables.title,
        code: variables.code,
      });
      queryClient.setQueryData<fetchAllResponse<Snippet>>(
        ["snippets"],
        (snippets) => ({
          ...(snippets || ({} as fetchAllResponse<Snippet>)),
          results:
            snippets?.results.map((s) => {
              if (s.slug === slug) {
                return { ...s, title: variables.title, code: variables.code };
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
      addSnippets(context.prevSnippets);
    },
  });
};

export default usePatchSnippet;
