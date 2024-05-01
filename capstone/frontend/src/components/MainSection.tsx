import { Box, Button, Icon } from "@chakra-ui/react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Outlet } from "react-router-dom";

const MainSection = () => {
  return (
    <Box paddingInline={5} ml={5}>
      <Outlet />
      <Button
        position="fixed"
        colorScheme="telegram"
        zIndex={999}
        bottom={5}
        right={5}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon as={MdKeyboardDoubleArrowUp} boxSize={6} />
      </Button>
    </Box>
  );
};

export default MainSection;
