import {
  useDisclosure,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React from "react";
import { PassConfirmPass } from "./PasswordChangeDiscardAlert";
import usePatchAccountPassword from "../hooks/usePatchAccountPassword";

interface Props {
  handleSubmit: () => void;
  watch: PassConfirmPass;
  isPending: boolean;
}

const PasswordChangeSaveAlert = ({ handleSubmit, watch, isPending }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const { reset } = usePatchAccountPassword();

  return (
    <>
      <Button
        isLoading={isPending}
        loadingText="Saving"
        type="submit"
        onClick={() => {
          reset();
          onOpen();
        }}
        isDisabled={!watch.newPassword || !watch.confirmPassword}
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
            <Button
              colorScheme="green"
              ml={3}
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PasswordChangeSaveAlert;
