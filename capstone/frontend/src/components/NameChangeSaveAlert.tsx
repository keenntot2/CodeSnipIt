import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import useChangeNameStore from "../hooks/useChangeNameStore";
import { NAME_REGEX } from "../pages/RegisterPage";

interface Props {
  handleSubmit: () => void;
}

const NameChangeSaveAlert = ({ handleSubmit }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { firstName, lastName } = useChangeNameStore();

  return (
    <>
      <Button
        type="submit"
        onClick={onOpen}
        isDisabled={!NAME_REGEX.test(firstName) || !NAME_REGEX.test(lastName)}
      >
        Save
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent w={{ base: "300px", md: "auto" }}>
          <AlertDialogHeader>Save Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to save these changes?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="green" ml={3} onClick={() => handleSubmit()}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NameChangeSaveAlert;
