import { Box } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";

const MainSection = () => {
  return (
    <Box paddingInline={5} ml={5}>
      <Outlet />
    </Box>
  );
};

export default MainSection;
