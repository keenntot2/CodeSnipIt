import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import fetchAllResponse from "../entities/FetchAllResponse";
import APIClient from "../services/apiClient";
import useSnippetListStore from "./useSnippetListStore";
import useIsEditStore from "./useIsEditStore";
import useSnippetStore from "./useSnippetStore";

interface SnippetMutate {
  language_slug: string;
  title: string;
  code: string;
}

export interface Snippet {
  id: number;
  language: string;
  title: string;
  code: string;
  slug: string;
  created_at: string;
  edited_at: string;
}

const apiClient = new APIClient<SnippetMutate, Snippet>("/add-snippet");

const useAddSnippet = () => {
  const queryClient = useQueryClient();
  const addSnippets = useSnippetListStore((s) => s.addSnippets);
  const { setSnippet } = useSnippetStore();
  const setSlug = useIsEditStore((s) => s.setSlug);
  return useMutation<Snippet, AxiosError, SnippetMutate>({
    mutationFn: apiClient.post,
    onSuccess: (data) => {
      setSnippet(data);
      setSlug({ languageSlug: data.language, snippetSlug: data.slug });
      const snippetData = queryClient.getQueryData<fetchAllResponse<Snippet>>([
        "snippets",
      ]);
      queryClient.setQueryData<fetchAllResponse<Snippet>>(
        ["snippets"],
        (snippets) => ({
          ...(snippets || ({} as fetchAllResponse<Snippet>)),
          count: snippets?.count ? snippets.count + 1 : 1,
          results: [data, ...(snippets?.results || [])],
        })
      );

      if (snippetData?.results) {
        addSnippets({
          ...snippetData,
          results: [data, ...snippetData.results],
        });
      }
    },
  });
};

export default useAddSnippet;
