import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import APIClient from "../services/apiClient";

import fetchAllResponse from "../entities/FetchAllResponse";
import { languageData } from "../initialData/languageData";

export interface Language {
  id: number;
  language: string;
  slug: string;
}

const apiClient = new APIClient<fetchAllResponse<Language>>("/languages");

const useLanguage = () => {
  return useQuery<
    fetchAllResponse<Language>,
    AxiosError,
    fetchAllResponse<Language>,
    string[]
  >({
    queryKey: ["languages"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 60 * 1000,
    initialData: () => {
      return languageData;
    },
    refetchOnWindowFocus: false,
  });
};

export default useLanguage;
