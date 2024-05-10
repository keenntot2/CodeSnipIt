import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/apiClient";
import { useNavigate } from "react-router-dom";

const apiClient = new APIClient("/logout");

const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: apiClient.post,
    onError: () => {
      sessionStorage.removeItem("isLoggedIn");
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
