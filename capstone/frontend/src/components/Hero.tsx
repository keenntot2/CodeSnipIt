import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Show,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import CodeBlock from "./CodeBlock";

const Hero = () => {
  const titleBgColor = useColorModeValue("gray.200", "whiteAlpha.200");
  return (
    <HStack w="100%" justifyContent="space-between" h="100%" spacing={0}>
      <Flex h="100%" w="100%" justifyContent="center">
        <VStack
          spacing={{ base: "30px", lg: "50px" }}
          borderRadius={20}
          h="100%"
          w="700px"
          alignItems="center"
          justifyContent="center"
        >
          <Heading
            alignSelf="start"
            background={titleBgColor}
            p={5}
            borderRadius={10}
          >{`CodeSnipIt()`}</Heading>
          <Box w={{ base: "300px", lg: "400px" }}>
            <CodeBlock />
          </Box>
          <Text fontSize={{ base: "sm", lg: "xl" }} alignSelf="end">
            "Code made easy, one snippet at a time."
          </Text>
        </VStack>
      </Flex>

      <Show above="lg">
        <Divider orientation="vertical" h="90%" />
      </Show>
    </HStack>
  );
};

export default Hero;
