import { Box } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import useRefreshToken from "../hooks/useRefreshToken";
import useUser from "../hooks/useUser";
import useUserStore from "../hooks/useUserStore";
import checkBackgroundRequestTime from "../utils/checkBackgroundRequestTime";

const Layout = () => {
  const { data, isError, isLoading, isSuccess } = useUser();
  const setUser = useUserStore((s) => s.setUser);
  const { refetch } = useRefreshToken();

  if (isLoading) return null;
  if (isError) {
    if (sessionStorage.getItem("isLoggedIn"))
      sessionStorage.removeItem("isLoggedIn");
    return <Navigate to="/login" />;
  }
  if (isSuccess) {
    setUser(data);
    sessionStorage.setItem("isLoggedIn", "true");
    checkBackgroundRequestTime(refetch);
  }
  return (
    <Box p={2}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
