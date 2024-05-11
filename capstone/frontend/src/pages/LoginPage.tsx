import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import CodeBlock from "../components/CodeBlock";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <Flex paddingBlock={5} h="100dvh">
      <Grid
        w="100%"
        templateAreas={{ base: `'form'`, lg: `"hero form"` }}
        gridTemplateColumns={{ base: "100%", lg: "65% 1fr" }}
      >
        <Show above="lg">
          <GridItem area="hero">
            <HStack
              w="100%"
              justifyContent="space-between"
              h="100%"
              spacing={0}
            >
              <Flex h="100%" w="100%" justifyContent="center">
                <VStack
                  spacing="50px"
                  borderRadius={20}
                  h="100%"
                  w="700px"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading
                    alignSelf="start"
                    background="whiteAlpha.200"
                    p={5}
                    borderRadius={10}
                  >{`CodeSnipIt()`}</Heading>
                  <Box w="400px">
                    <CodeBlock />
                  </Box>
                  <Text fontSize="xl" alignSelf="end">
                    "Code made easy, one snippet at a time."
                  </Text>
                </VStack>
              </Flex>

              <Divider orientation="vertical" h="auto" alignSelf="stretch" />
            </HStack>
          </GridItem>
        </Show>

        <GridItem
          area="form"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <LoginForm />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default LoginPage;
