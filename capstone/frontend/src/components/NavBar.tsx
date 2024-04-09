import { Button, HStack, Text } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useUserStore from "../hooks/useUserStore";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  const { mutate, isSuccess, isPending } = useLogout();
  const user = useUserStore((s) => s.user);

  if (isSuccess) {
    sessionStorage.removeItem("isLoggedIn");
    localStorage.removeItem("lastLoginTime");
    const intervalId = localStorage.getItem("intervalId");
    if (intervalId) {
      clearTimeout(parseInt(intervalId));
      localStorage.removeItem("intervalId");
    }
    return <Navigate to="/login" />;
  }

  if (!user) return null;

  return (
    <HStack justifyContent={"space-between"}>
      <Text>Hi, {`${user.first_name} ${user.last_name}`}</Text>
      <HStack>
        <ColorModeSwitch />
        <Button
          variant="ghost"
          onClick={() => mutate(null)}
          isLoading={isPending}
          loadingText="Logging out"
        >
          Logout
        </Button>
      </HStack>
    </HStack>
  );
};

export default NavBar;
