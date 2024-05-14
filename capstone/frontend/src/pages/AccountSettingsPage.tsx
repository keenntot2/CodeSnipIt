import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Heading,
  Show,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useSnippetList from "../hooks/useSnippetList";
import useUser from "../hooks/useUser";

const AccountSettingsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: snippets, isLoading } = useSnippetList();

  return (
    <Box flexGrow="1" display="flex" flexDirection="column">
      <Grid
        templateAreas={{ base: `'main'`, lg: `'aside main'` }}
        gridTemplateColumns={{ base: "100%", lg: "300px 1fr" }}
        flexGrow="1"
      >
        <Show above="lg">
          <GridItem area="aside">
            <HStack justifyContent="space-between" alignItems="start" h="100%">
              <VStack alignItems="start" w="100%" px={3}>
                <Heading color="gray.400" fontSize="2xl">
                  Account Info:
                </Heading>
                <VStack alignItems="start" alignSelf="center" w="100%" p={5}>
                  <Box>
                    <Heading as="dt" fontSize="md" color="gray.600">
                      Name:
                    </Heading>
                    <Skeleton isLoaded={!isLoadingUser} borderRadius={5}>
                      <Text
                        as="dd"
                        color="gray.400"
                      >{`${user?.first_name} ${user?.last_name}`}</Text>
                    </Skeleton>
                  </Box>
                  <HStack justifyContent="start">
                    <Heading as="dt" fontSize="md" color="gray.600">
                      Snippets:
                    </Heading>
                    <Skeleton
                      isLoaded={!isLoading}
                      borderRadius={5}
                      w={5}
                      h={5}
                    >
                      <Text as="dd" color="gray.400">
                        {snippets?.count}
                      </Text>
                    </Skeleton>
                  </HStack>
                </VStack>
              </VStack>
              <Divider orientation="vertical" h="auto" alignSelf="stretch" />
            </HStack>
          </GridItem>
        </Show>

        <GridItem area="main" display="flex" flexDirection="column">
          <Show below="lg">
            <Box px={3}>
              <Heading color="gray.400" fontSize="2xl">
                Account Info:
              </Heading>
              <VStack alignItems="start" alignSelf="center" w="100%" p={5}>
                <Box>
                  <Heading as="dt" fontSize="md" color="gray.600">
                    Name:
                  </Heading>
                  <Text
                    as="dd"
                    color="gray.400"
                  >{`${user?.first_name} ${user?.last_name}`}</Text>
                </Box>
                <HStack justifyContent="start">
                  <Heading as="dt" fontSize="md" color="gray.600">
                    Snippets:
                  </Heading>
                  <Text as="dd" color="gray.400">
                    {snippets?.count}
                  </Text>
                </HStack>
              </VStack>
              <Divider mb={5} />
            </Box>
          </Show>
          <Box
            paddingInline={{ base: 0, lg: 5 }}
            ml={{ lg: 5 }}
            h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {location.pathname == "/account" ? (
              <VStack>
                <Button
                  w="100%"
                  onClick={() => navigate("/account/change/name")}
                >
                  Change name
                </Button>

                <Button
                  w="100%"
                  onClick={() => navigate("/account/change/password")}
                >
                  Change password
                </Button>
              </VStack>
            ) : (
              <Box
                h="100%"
                w="100%"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                <Outlet />
              </Box>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default AccountSettingsPage;
