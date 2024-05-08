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
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useChangeNameStore from "../hooks/useChangeNameStore";

const NameChangeDiscardButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { firstName, lastName } = useChangeNameStore();
  const cancelRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <Button
        onClick={() => {
          if (firstName || lastName) {
            onOpen();
          } else {
            navigate("/account");
          }
        }}
      >
        <IoIosArrowBack />
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent w={{ base: 300, lg: "auto" }}>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Your account name changes aren't saved yet. Would you like to
            discard them?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                onClose();
              }}
            >
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => navigate("/account")}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NameChangeDiscardButton;
