import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";

interface SnippetMutate {
  language_slug: string;
  title: string;
  code: string;
}

interface Snippet {
  id: number;
  language: string;
  title: string;
  code: string;
  slug: string;
  created_at: string;
  edited_at: string;
}

const apiClient = new APIClient<SnippetMutate, Snippet>("/add-snippet");

const useAddSnippet = () =>
  useMutation<Snippet, AxiosError, SnippetMutate>({
    mutationFn: apiClient.post,
    onSuccess: (data) => console.log(data),
  });

export default useAddSnippet;
