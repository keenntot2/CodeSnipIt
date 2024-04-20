import { Text } from "@chakra-ui/react";

import { Outlet } from "react-router-dom";

const MainSection = () => {
  return (
    <>
      <Text border={"solid blue"}>Main Section</Text>
      <Outlet />
    </>
  );
};

export default MainSection;
