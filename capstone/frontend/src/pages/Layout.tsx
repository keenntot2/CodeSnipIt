import { Box, Button, Grid, GridItem, Hide, Icon } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Navigate, Outlet } from "react-router-dom";
import LanguageList from "../components/LanguageList";
import NavBar from "../components/NavBar";
import useRefreshToken from "../hooks/useRefreshToken";
import useUser from "../hooks/useUser";
import useUserStore from "../hooks/useUserStore";
import checkBackgroundRequestTime from "../utils/checkBackgroundRequestTime";

const Layout = () => {
  const { data, isError, isLoading, isSuccess } = useUser();
  const setUser = useUserStore((s) => s.setUser);
  const { refetch } = useRefreshToken();

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
      sessionStorage.setItem("isLoggedIn", "true");
      checkBackgroundRequestTime(refetch);
    }
  }, [isSuccess]);

  if (isLoading) return null;
  if (isError) {
    if (sessionStorage.getItem("isLoggedIn"))
      sessionStorage.removeItem("isLoggedIn");
    return <Navigate to="/login" />;
  }

  return (
    <Box p={5}>
      <Box mb={10}>
        <NavBar />
      </Box>
      <Grid
        templateAreas={{ base: `'main'`, lg: `'aside main'` }}
        gridTemplateColumns={{ base: "1fr", lg: "300px 1fr" }}
      >
        <Hide below="lg">
          <GridItem area="aside">
            <LanguageList />
          </GridItem>
        </Hide>
        <GridItem area="main">
          <Box paddingInline={5} ml={{ lg: 5 }} w="100%">
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
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Layout;
