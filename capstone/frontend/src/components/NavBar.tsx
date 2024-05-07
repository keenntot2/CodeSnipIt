import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useIsEditStore from "../hooks/useIsEditStore";
import useLogout from "../hooks/useLogout";
import useUser from "../hooks/useUser";
import ColorModeSwitch from "./ColorModeSwitch";
import useIsUserEnabledStore from "../hooks/useIsUserEnabledStore";

const NavBar = () => {
  const { mutate, isSuccess, isPending } = useLogout();
  const { setPrompt, isEdit } = useIsEditStore();
  const setIsEnabled = useIsUserEnabledStore((s) => s.setIsEnabled);

  const { data } = useUser();
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

  if (!data) return null;

  return (
    <HStack justifyContent={"space-between"}>
      <HStack spacing={2}>
        <Button
          variant="ghost"
          padding={2}
          onClick={() => {
            if (isEdit) {
              setPrompt(true);
            } else {
              navigate("/");
            }
          }}
        >
          <Icon as={FaHome} boxSize={5} />
        </Button>
        <Text>Hi, {`${data.first_name} ${data.last_name}`}</Text>
      </HStack>
      <HStack>
        <ColorModeSwitch />
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
      </HStack>
    </HStack>
  );
};

export default NavBar;
