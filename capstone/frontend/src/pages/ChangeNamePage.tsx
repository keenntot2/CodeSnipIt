import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePatchAccount from "../hooks/usePatchAccount";
import { NAME_REGEX } from "./RegisterPage";

const schema = z.object({
  firstName: z.string().max(64).regex(NAME_REGEX, "Invalid name."),
  lastName: z.string().max(64).regex(NAME_REGEX, "Invalid name."),
});

type Schema = z.infer<typeof schema>;

const ChangeNamePage = () => {
  const { mutate, isSuccess } = usePatchAccount("name");
  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Schema>({ resolver: zodResolver(schema) });

  const onSubmit = (data: Schema) => {
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess)
      toast({
        description: "Your account has been successfully updated.",
        status: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
        containerStyle: {
          width: { base: "250px", lg: "max-content" },
          minW: "none",
        },
      });
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack w={300}>
        <FormControl isInvalid={!!errors.firstName}>
          <Input
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
        <Button type="submit">Save</Button>
      </VStack>
    </form>
  );
};

export default ChangeNamePage;
