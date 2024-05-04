import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useUserStore from "../hooks/useUserStore";
import ColorModeSwitch from "./ColorModeSwitch";
import useLanguageStore from "../hooks/useLanguageStore";

const NavBar = () => {
  const { mutate, isSuccess, isPending } = useLogout();
  const setLanguage = useLanguageStore((s) => s.setLanguage);
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();

  if (isSuccess) {
    sessionStorage.removeItem("isLoggedIn");
    localStorage.removeItem("lastLoginTime");
    const intervalId = localStorage.getItem("intervalId");
    if (intervalId) {
      clearInterval(parseInt(intervalId));
      localStorage.removeItem("intervalId");
    }
    return <Navigate to="/login" />;
  }

  if (!user) return null;

  return (
    <HStack justifyContent={"space-between"}>
      <HStack spacing={2}>
        <Button
          variant="ghost"
          padding={2}
          onClick={() => {
            setLanguage("");
            navigate("/");
          }}
        >
          <Icon as={FaHome} boxSize={5} />
        </Button>
        <Text>Hi, {`${user.first_name} ${user.last_name}`}</Text>
      </HStack>
      <HStack>
        <ColorModeSwitch />
        <Button
          variant="ghost"
          onClick={() => mutate(undefined)}
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
