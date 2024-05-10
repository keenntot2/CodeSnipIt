import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("/user");

const useIsLoggedIn = () => {
  const navigate = useNavigate();
  return useMutation<undefined, AxiosError, undefined>({
    mutationKey: ["isLoggedIn"],
    mutationFn: () => {
      const controller = new AbortController();
      const signal = controller.signal;
      return apiClient.post(undefined, { signal });
    },
    onSuccess: () => {
      console.log("success");
      const lastLoginTime = new Date().getTime();
      localStorage.setItem("lastLoginTime", lastLoginTime.toString());
      sessionStorage.setItem("isLoggedIn", "true");
      navigate("/");
    },
  });
};

export default useIsLoggedIn;
