import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Navigate } from "react-router-dom";
import { z } from "zod";
import PasswordChangeDiscardAlert from "../components/PasswordChangeDiscardAlert";
import PasswordChangeSaveAlert from "../components/PasswordChangeSaveAlert";
import usePatchAccountPassword from "../hooks/usePatchAccountPassword";
import { PASSWORD_REGEX } from "./RegisterPage";

const schema = z.object({
  oldPassword: z.string().min(1, "Please enter your old password."),
  newPassword: z
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

const ChangePasswordPage = () => {
  const { onOpen } = useDisclosure();
  const { mutate, error, isSuccess, isPending } = usePatchAccountPassword();
  const [show, setShow] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Schema) => {
    mutate(data);
  };

  if (isSuccess) return <Navigate to="/account" />;

  return (
    <>
      <Box position="absolute" top={0} left={0}>
        <PasswordChangeDiscardAlert watch={watch()} />
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onOpen();
        }}
      >
        <VStack w={300}>
          <FormControl
            isInvalid={!!errors.oldPassword || error?.response?.status === 401}
          >
            <Input
              {...register("oldPassword")}
              placeholder="Confirm password"
              type="password"
            />
            <FormErrorMessage>
              {errors.oldPassword?.message ||
                "Your old password is incorrect. Please try again."}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.newPassword}>
            <InputGroup>
              <Input
                {...register("newPassword")}
                autoFocus
                placeholder="Password"
                type={show ? "text" : "password"}
              />
              <InputRightElement>
                <Flex
                  cursor="pointer"
                  alignItems="center"
                  onClick={() => setShow(!show)}
                >
                  {show ? <Icon as={FaEyeSlash} /> : <Icon as={FaEye} />}
                </Flex>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={
              !!errors.confirmPassword || error?.response?.status === 400
            }
          >
            <Input
              {...register("confirmPassword")}
              placeholder="Confirm password"
              type="password"
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message ||
                "New password and confirm password do not match."}
            </FormErrorMessage>
          </FormControl>
          <Box mt={5}>
            <PasswordChangeSaveAlert
              handleSubmit={handleSubmit(onSubmit)}
              watch={watch()}
              isPending={isPending}
            />
          </Box>
        </VStack>
      </form>
    </>
  );
};

export default ChangePasswordPage;
