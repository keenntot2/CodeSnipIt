import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import useIsLoggedIn from "../hooks/useIsLoggedIn";

const Login = () => {
  const { mutate, isError, isPending, isSuccess } = useAuth();
  const { isSuccess: isLoggedin, isFetching } = useIsLoggedIn();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  if (isFetching) return null;
  if (isSuccess || isLoggedin) return <Navigate to="/" />;

  return (
    <Flex padding={5} h="100dvh" alignItems="center" justifyContent="center">
      <form
        className="authForm"
        onSubmit={(e) => {
          e.preventDefault();
          if (usernameRef.current?.value && passwordRef.current?.value) {
            mutate({
              username: usernameRef.current?.value,
              password: passwordRef.current?.value,
            });
          }
        }}
      >
        <FormControl isInvalid={isError}>
          <VStack>
            <Input ref={usernameRef} placeholder="Username" id="username" />
            <Input
              ref={passwordRef}
              placeholder="Password"
              type="password"
              id="password"
            />
            {isError && (
              <FormErrorMessage>Invalid username or password.</FormErrorMessage>
            )}
            <Button mt={5} type="submit">
              {isPending ? <Spinner /> : "Login"}
            </Button>
          </VStack>
        </FormControl>
      </form>
    </Flex>
  );
};

export default Login;
