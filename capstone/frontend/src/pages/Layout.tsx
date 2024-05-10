import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Show,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import LanguageList from "../components/LanguageList";
import NavBar from "../components/NavBar";
import useRefreshToken from "../hooks/useRefreshToken";
import useUser from "../hooks/useUser";
import useUserStore from "../hooks/useUserStore";
import checkBackgroundRequestTime from "../utils/checkBackgroundRequestTime";
import useLogout from "../hooks/useLogout";

const Layout = () => {
  const { data, isError, isSuccess, error } = useUser();
  const { mutate } = useLogout();
  const setUser = useUserStore((s) => s.setUser);
  const { refetch } = useRefreshToken();
  const location = useLocation();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      sessionStorage.removeItem("isLoggedIn");
      localStorage.removeItem("lastLoginTime");
      const intervalId = localStorage.getItem("intervalId");
      if (intervalId) {
        clearInterval(parseInt(intervalId));
        localStorage.removeItem("intervalId");
      }
      if (error.response?.status != 401) {
        toast({
          title: "Error",
          description:
            "It seems there has been a problem on the server. Please try again later.",
          status: "error",
          duration: 4000,
          position: "top",
          isClosable: true,
          containerStyle: {
            width: { base: "250px", lg: "max-content" },
            minW: "none",
          },
        });
      }
      mutate(undefined);
      navigate("/login");
    }
    if (isSuccess) {
      setUser(data);
      checkBackgroundRequestTime(refetch);
    }
  }, [isSuccess, isError]);

  if (!sessionStorage.getItem("isLoggedIn")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Flex p={5} flexDirection="column" minH="100dvh">
        <Box mb={10}>
          <NavBar />
        </Box>
        {location.pathname.split("/").includes("account") ? (
          <Outlet />
        ) : (
          <Grid
            templateAreas={{ base: `'main'`, lg: `'aside main'` }}
            gridTemplateColumns={{ base: "100%", lg: "300px 1fr" }}
          >
            <Show above="lg">
              <GridItem area="aside">
                <LanguageList />
              </GridItem>
            </Show>
            <GridItem area="main">
              <Box paddingInline={{ base: 0, lg: 5 }} ml={{ lg: 5 }}>
                <Outlet />
                <Button
                  position="fixed"
                  colorScheme="telegram"
                  zIndex={999}
                  bottom={5}
                  right={5}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  <Icon as={MdKeyboardDoubleArrowUp} boxSize={6} />
                </Button>
              </Box>
            </GridItem>
          </Grid>
        )}
      </Flex>
    </>
  );
};

export default Layout;
