import { Flex, Heading, Text } from "@chakra-ui/react";

const InvalidLanguageError = () => {
  return (
    <Flex flexDirection="column" alignItems="center">
      <Heading>Oops!</Heading>
      <Text>You have entered an invalid language.</Text>
    </Flex>
  );
};

export default InvalidLanguageError;
