import { Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import useUserStore from "../hooks/useUserStore";
import NavBar from "./NavBar";
import useRefreshToken from "../hooks/useRefreshToken";

const Layout = () => {
  const { data, isError, isLoading, isSuccess } = useUser();
  const setUser = useUserStore((s) => s.setUser);
  useRefreshToken(isSuccess);

  if (isLoading) return null;
  if (isError) return <Navigate to="/login" />;
  if (isSuccess) {
    setUser(data);
  }
  return (
    <Box p={2}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
