import {
  Box,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import NameChangeDiscardButton from "../components/NameChangeDiscardButton";
import NameChangeSaveAlert from "../components/NameChangeSaveAlert";
import useChangeNameStore from "../hooks/useChangeNameStore";
import usePatchAccount from "../hooks/usePatchAccount";
import { NAME_REGEX } from "./RegisterPage";

const schema = z.object({
  firstName: z.string().max(64).regex(NAME_REGEX, "Invalid name."),
  lastName: z.string().max(64).regex(NAME_REGEX, "Invalid name."),
});

export type ChangeNameSchema = z.infer<typeof schema>;

const ChangeNamePage = () => {
  const { mutate } = usePatchAccount("name");
  const { setFirstName, setLastName } = useChangeNameStore();
  const { onOpen } = useDisclosure();

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<ChangeNameSchema>({ resolver: zodResolver(schema) });

  const onSubmit = (data: ChangeNameSchema) => {
    mutate(data);
    navigate("/account");
  };

  useEffect(() => {
    setFirstName(watch("firstName"));
  }, [watch("firstName")]);

  useEffect(() => {
    setLastName(watch("lastName"));
  }, [watch("lastName")]);

  return (
    <>
      <Box position="absolute" top={0} left={0}>
        <NameChangeDiscardButton />
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onOpen();
        }}
      >
        <VStack w={300}>
          <FormControl isInvalid={!!errors.firstName}>
            <Input
              autoFocus
              {...register("firstName")}
              placeholder="First name"
              type="text"
            />
            <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.lastName}>
            <Input
              {...register("lastName")}
              placeholder="Last name"
              type="text"
            />
            <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
          </FormControl>
          <NameChangeSaveAlert handleSubmit={handleSubmit(onSubmit)} />
        </VStack>
      </form>
    </>
  );
};

export default ChangeNamePage;
