import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { Snippet } from "./useAddSnippet";
import fetchAllResponse from "../entities/FetchAllResponse";

const apiClient = new APIClient<fetchAllResponse<Snippet>>("/snippet-list");

const useSnippetList = () =>
  useQuery({
    queryKey: ["snippets"],
    queryFn: ({ signal }) => apiClient.getAll({ signal }),
    staleTime: 4 * 60 * 1000,
  });

export default useSnippetList;
