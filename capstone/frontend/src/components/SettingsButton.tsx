import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdDarkMode,
  MdLightMode,
  MdLogout,
  MdManageAccounts,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useIsEditStore from "../hooks/useIsEditStore";
import useLogout from "../hooks/useLogout";

const SettingsButton = () => {
  const { mutate, isPending } = useLogout();
  const { setPrompt, isEdit } = useIsEditStore();

  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button}>
        <IoSettingsOutline />
      </MenuButton>
      <MenuList>
        <MenuItem
          icon={<MdManageAccounts />}
          onClick={() => navigate("/account")}
        >
          Account settings
        </MenuItem>
        <MenuItem
          onClick={toggleColorMode}
          closeOnSelect={false}
          icon={
            colorMode === "dark" ? (
              <MdDarkMode />
            ) : (
              <Icon color="yellow.400" as={MdLightMode} />
            )
          }
        >
          <Text>{colorMode === "light" ? "Light" : "Dark"}</Text>
        </MenuItem>
        <MenuItem
          icon={isPending ? <Spinner size="sm" /> : <MdLogout />}
          closeOnSelect={false}
          onClick={() => {
            if (isEdit) {
              setPrompt(true);
            } else {
              mutate(undefined);
            }
          }}
        >
          {isPending ? "Logging out" : "Logout"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SettingsButton;
