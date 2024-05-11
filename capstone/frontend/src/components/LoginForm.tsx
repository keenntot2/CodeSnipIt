import {
  VStack,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useIsLoggedIn from "../hooks/useLoggedIn";
import getCookie from "../utils/getCookie";

const LoginForm = () => {
  const { mutate, isError, isPending, isSuccess } = useAuth();
  const { mutate: mutateIsLoggedIn, isPending: isCheckingUser } =
    useIsLoggedIn();
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isLoggedIn = getCookie("isLoggedIn");

  useEffect(() => {
    mutateIsLoggedIn(undefined);
  }, []);

  if (isSuccess || isLoggedIn) {
    const lastLoginTime = new Date().getTime();
    localStorage.setItem("lastLoginTime", lastLoginTime.toString());
    return <Navigate to="/" />;
  }

  if (isCheckingUser) {
    return null;
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
