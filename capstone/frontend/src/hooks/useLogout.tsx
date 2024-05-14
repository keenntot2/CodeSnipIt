import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import APIClient from "../services/apiClient";

const apiClient = new APIClient("/logout");

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const removeCache = () => {
    // remove user cache
    queryClient.removeQueries({ queryKey: ["user"], exact: true });

    // remove snippet chache
    queryClient.removeQueries({ queryKey: ["snippets"], exact: true });
  };

  return useMutation({
    mutationFn: apiClient.post,
    onSettled: () => {
      removeCache();
      document.cookie = `isLoggedIn=; max-age=0; path=/;`;
      localStorage.removeItem("lastLoginTime");
      const intervalId = localStorage.getItem("intervalId");
      if (intervalId) {
        clearInterval(parseInt(intervalId));
        localStorage.removeItem("intervalId");
      }

      navigate("/login");
    },
  });
};

export default useLogout;
