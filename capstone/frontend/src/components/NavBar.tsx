import { Button, HStack, Icon, Skeleton, Text } from "@chakra-ui/react";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useIsEditStore from "../hooks/useIsEditStore";
import useUser from "../hooks/useUser";
import SettingsButton from "./SettingsButton";

const NavBar = () => {
  const { setPrompt, isEdit } = useIsEditStore();

  const { data, isLoading } = useUser();
  const navigate = useNavigate();

  return (
    <HStack justifyContent={"space-between"}>
      <HStack spacing={2}>
        <Skeleton isLoaded={!isLoading} borderRadius={5}>
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
        </Skeleton>
        <Skeleton isLoaded={!isLoading} borderRadius={5}>
          <Text>Hi, {`${data?.first_name.split(" ")[0]}!`}</Text>
        </Skeleton>
      </HStack>
      <HStack>
        <Skeleton isLoaded={!isLoading} borderRadius={5}>
          <SettingsButton />
        </Skeleton>
      </HStack>
    </HStack>
  );
};

export default NavBar;
