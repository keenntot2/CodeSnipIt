import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useIsEditStore from "../hooks/useIsEditStore";
import useUser from "../hooks/useUser";
import SettingsButton from "./SettingsButton";

const NavBar = () => {
  const { setPrompt, isEdit } = useIsEditStore();

  const { data } = useUser();
  const navigate = useNavigate();

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
        <SettingsButton />
      </HStack>
    </HStack>
  );
};

export default NavBar;
