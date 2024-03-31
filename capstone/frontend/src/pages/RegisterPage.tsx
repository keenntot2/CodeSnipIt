import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Icon,
  Input,
  ListItem,
  Spinner,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { z } from "zod";
import useVerifyUsername from "../hooks/useVerifyUsername";

const USERNAME_MIN_CHAR = 5;
const PASSWORD_MIN_CHAR = 6;
const PASSWORD_REGEX = new RegExp("^(?=.*\\d).{" + PASSWORD_MIN_CHAR + ",}$");
const NAME_REGEX = /^[a-zA-Z'-]+(?:\s[a-zA-Z'-]+)*$/;

const schema = z.object({
  firstName: z.string().max(64).regex(NAME_REGEX, "Invalid name."),
  lastName: z.string().max(64).regex(NAME_REGEX, "Invalid name."),
  userName: z
    .string()
    .min(
      USERNAME_MIN_CHAR,
      `Username must consist of at least ${USERNAME_MIN_CHAR} characters.`
    ),
  password: z
    .string()
    .min(6, "Password must consist of at least 6 characters.")
    .regex(
      PASSWORD_REGEX,
      "Password must contain at least one numerical character."
    ),
  confirmPassword: z
    .string()
    .min(6, "Password must consist of at least 6 characters."),
});

type Schema = z.infer<typeof schema>;

const RegisterPage = () => {
  const { mutate, isSuccess, isPending, isError, error } = useVerifyUsername();

  const [isMin, setIsMin] = useState(false);

  const isCheck = isSuccess && isMin;

  let timeoutId: number;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Schema) => {
    if (watch("password") == watch("confirmPassword")) {
      console.log(data);
    }
  };

  let usernameTaken = error?.response?.status == 409;

  return (
    <Flex padding={5} h="100dvh" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)} className="authForm">
        <VStack>
          <FormControl isInvalid={!!errors.firstName}>
            <HStack>
              <Input
                {...register("firstName")}
                placeholder="First name"
                id="firstname"
                w="90%"
              />
              {!!watch("firstName") && NAME_REGEX.test(watch("firstName")) && (
                <Icon as={FaCheckCircle} color="green.400"></Icon>
              )}
            </HStack>

            {errors.firstName && (
              <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.lastName}>
            <HStack>
              <Input
                {...register("lastName")}
                placeholder="Last name"
                id="lastname"
                w="90%"
              />
              {!!watch("lastName") && NAME_REGEX.test(watch("lastName")) && (
                <Icon as={FaCheckCircle} color="green.400"></Icon>
              )}
            </HStack>
            {errors.lastName && (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.userName || usernameTaken}>
            <HStack>
              <Input
                {...register("userName")}
                placeholder="Username"
                id="username"
                w="90%"
                onChange={(e) => {
                  const username = e.target.value;
                  clearTimeout(timeoutId);
                  if (username.length >= USERNAME_MIN_CHAR) {
                    setIsMin(true);
                    timeoutId = setTimeout(() => {
                      mutate({ username: username });
                    }, 500);
                  }
                  if (username.length < USERNAME_MIN_CHAR) setIsMin(false);
                }}
              />
              {isCheck ? (
                <Icon as={FaCheckCircle} color="green.400"></Icon>
              ) : (
                isPending && isMin && <Spinner color="green.400" />
              )}
              {isError && <Icon as={FaExclamationCircle} color="red.400" />}
            </HStack>
            <FormHelperText>
              <UnorderedList>
                <ListItem>
                  Minimum of at least {USERNAME_MIN_CHAR} characters.
                </ListItem>
              </UnorderedList>
            </FormHelperText>
            {(usernameTaken || !isMin) && (
              <FormErrorMessage>
                <UnorderedList>
                  {!isMin && (
                    <ListItem>{`Username must consist of at least ${USERNAME_MIN_CHAR} characters.`}</ListItem>
                  )}
                  {usernameTaken && isMin && (
                    <ListItem>"Username is already taken."</ListItem>
                  )}
                </UnorderedList>
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <HStack>
              <Input
                {...register("password")}
                placeholder="Password"
                type="password"
                id="password"
                w="90%"
              />
              {PASSWORD_REGEX.test(watch("password")) && (
                <Icon as={FaCheckCircle} color="green.400"></Icon>
              )}
            </HStack>
            <FormHelperText>
              <UnorderedList>
                <ListItem>
                  Minimum of at least {PASSWORD_MIN_CHAR} characters.
                </ListItem>
                <ListItem>
                  Must contain of at least one numerical character.
                </ListItem>
              </UnorderedList>
            </FormHelperText>
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              !!errors.confirmPassword ||
              watch("password") != watch("confirmPassword")
            }
          >
            <HStack>
              <Input
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                type="password"
                id="confirmpassword"
                w="90%"
              />
              {watch("password") == watch("confirmPassword") &&
                PASSWORD_REGEX.test(watch("confirmPassword")) && (
                  <Icon as={FaCheckCircle} color="green.400"></Icon>
                )}
            </HStack>
            <FormErrorMessage>
              {errors.confirmPassword?.message ||
                "Please ensure that your confirmation password matches your original password."}
            </FormErrorMessage>
          </FormControl>

          <Button
            mt={5}
            type="submit"
            isDisabled={
              !!!(
                watch([
                  "firstName",
                  "lastName",
                  "userName",
                  "password",
                  "confirmPassword",
                ]).filter((i) => i).length == 5
              )
            }
          >
            Register
          </Button>
        </VStack>
      </form>
    </Flex>
  );
};

export default RegisterPage;
