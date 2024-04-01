import { Button, HStack, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useUserStore from "../hooks/useUserStore";
import ColorModeSwitch from "../components/ColorModeSwitch";

const NavBar = () => {
  const user = useUserStore((s) => s.user);
  const { mutate, isSuccess } = useLogout();
  const [logout, setLogout] = useState(false);

  if (isSuccess) return <Navigate to="/login" />;
  if (!user) return null;

  const handleClick = () => {
    mutate(null);
    setLogout(true);
  };

  return (
    <HStack>
      <Text>Hi, {`${user.first_name} ${user.last_name}`}</Text>
      <ColorModeSwitch />
      <Button variant="ghost" onClick={handleClick}>
        {logout ? <Spinner /> : "Logout"}
      </Button>
    </HStack>
  );
};

export default NavBar;
