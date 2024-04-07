import { Box } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import useUser from "../hooks/useUser";
import useUserStore from "../hooks/useUserStore";
import NavBar from "./NavBar";

const Layout = () => {
  const { data, isError, isLoading, isSuccess } = useUser();
  const setUser = useUserStore((s) => s.setUser);
  useRefreshToken(isSuccess);

  const navigate = useNavigate();

  if (isLoading) return null;
  if (isError) {
    if (sessionStorage.getItem("isLoggedIn"))
      sessionStorage.removeItem("isLoggedIn");
    navigate("/login");
  }
  if (isSuccess) {
    setUser(data);
    sessionStorage.setItem("isLoggedIn", "true");
  }
  return (
    <Box p={2}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
