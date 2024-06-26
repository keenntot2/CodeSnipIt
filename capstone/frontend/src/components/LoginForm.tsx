import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import getCookie from "../utils/getCookie";

const LoginForm = () => {
  const { mutate, isError, isPending, isSuccess } = useAuth();

  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isLoggedIn = getCookie("isLoggedIn");

  if (isSuccess || isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <form
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
      <VStack w={300} spacing={5}>
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
        <Button
          colorScheme="green"
          size="sm"
          variant="outline"
          onClick={() => navigate("/register")}
        >
          Create New Account
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
