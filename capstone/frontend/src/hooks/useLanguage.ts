import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { AxiosError } from "axios";

import { FetchAllResponse } from "../entities/FetchAllResponse";
import { languageData } from "../initialData/languageData";


interface Language { 
    id: number;
    language: string;
    slug: string
}

const apiClient = new APIClient<FetchAllResponse<Language>>('/languages')

const useLanguage = () => useQuery<FetchAllResponse<Language>, AxiosError, FetchAllResponse<Language>, string[]>({
    queryKey: ['languages'],
    queryFn: apiClient.getAll,
    staleTime: 24 * 60 * 1000,
    initialData: languageData
})

export default useLanguage