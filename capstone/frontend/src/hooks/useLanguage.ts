import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";

import { languageData } from "../initialData/languageData";
import fetchAllResponse from "../entities/FetchAllResponse";

interface Language {
  id: number;
  language: string;
  slug: string;
}

const apiClient = new APIClient<fetchAllResponse<Language>>("/languages");

const useLanguage = () =>
  useQuery<
    fetchAllResponse<Language>,
    AxiosError,
    fetchAllResponse<Language>,
    string[]
  >({
    queryKey: ["languages"],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 1000,
    initialData: languageData,
  });

export default useLanguage;
