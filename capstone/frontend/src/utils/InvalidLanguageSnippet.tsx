import { Flex, Heading, Text } from "@chakra-ui/react";

const InvalidLanguageSnippet = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading>Oops!</Heading>
      <Text>You have entered an invalid language or snippet.</Text>
    </Flex>
  );
};

export default InvalidLanguageSnippet;
