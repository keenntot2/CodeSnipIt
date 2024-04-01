import { Switch, useColorMode, Text, HStack } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack>
      <Switch
        isChecked={colorMode === "dark"}
        colorScheme="green"
        onChange={toggleColorMode}
        size={"sm"}
      />
      <Text>{colorMode === "light" ? "Light" : "Dark"}</Text>
    </HStack>
  );
};

export default ColorModeSwitch;
