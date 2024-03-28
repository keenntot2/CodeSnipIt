import { Button, Flex, Input, VStack } from "@chakra-ui/react";

const RegisterPage = () => {
  return (
    <Flex padding={5} h="100dvh" alignItems="center" justifyContent="center">
      <form>
        <VStack>
          <Input placeholder="First name" id="firstname" />
          <Input placeholder="Last name" id="lastname" />
          <Input placeholder="Username" id="username" />
          <Input placeholder="Password" type="password" id="password" />
          <Input
            placeholder="Confirm Password"
            type="password"
            id="confirmpassword"
          />

          <Button type="submit">Register</Button>
        </VStack>
      </form>
    </Flex>
  );
};

export default RegisterPage;
