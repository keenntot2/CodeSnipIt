import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsEditStore from "../hooks/useIsEditStore";
import useIsUserEnabledStore from "../hooks/useIsUserEnabledStore";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const { mutate, isSuccess, isPending } = useLogout();
  const { setPrompt, isEdit } = useIsEditStore();
  const setIsEnabled = useIsUserEnabledStore((s) => s.setIsEnabled);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.removeItem("isLoggedIn");
      localStorage.removeItem("lastLoginTime");
      const intervalId = localStorage.getItem("intervalId");
      if (intervalId) {
        clearInterval(parseInt(intervalId));
        localStorage.removeItem("intervalId");
      }
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <Button
      variant="ghost"
      onClick={() => {
        if (isEdit) {
          setPrompt(true);
        } else {
          setIsEnabled(false);
          mutate(undefined);
        }
      }}
      isLoading={isPending}
      loadingText="Logging out"
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
