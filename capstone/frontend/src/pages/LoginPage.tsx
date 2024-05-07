import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
import useIsUserEnabledStore from "../hooks/useIsUserEnabledStore";
import { useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const { mutate, isError, isPending, isSuccess } = useAuth();
  const { isSuccess: isUser } = useUser();
  const isEnabled = useIsUserEnabledStore((s) => s.isEnabled);
  const queryClient = useQueryClient();

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  if (!isEnabled) {
    queryClient.removeQueries({ queryKey: ["user"], exact: true });
  }

  if (isSuccess || isLoggedIn || isUser) {
    const lastLoginTime = new Date().getTime();
    localStorage.setItem("lastLoginTime", lastLoginTime.toString());
    return <Navigate to="/" />;
  }

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
            <Button
              mt={5}
              type="submit"
              isLoading={isPending}
              loadingText="Logging in"
            >
              Login
            </Button>
          </VStack>
        </FormControl>
      </form>
    </Flex>
  );
};

export default LoginPage;
