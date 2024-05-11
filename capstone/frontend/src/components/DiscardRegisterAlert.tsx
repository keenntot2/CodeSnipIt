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

const DiscardRegisterAlert = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const navigate = useNavigate();

  return (
    <>
      <Button size="sm" onClick={onOpen} leftIcon={<IoIosArrowBack />}>
        Back to Login
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
          <AlertDialogHeader>Discard Registration?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            "Are you sure you want to discard the form and not continue with the
            registration process?"
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
            <Button colorScheme="red" ml={3} onClick={() => navigate("/login")}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DiscardRegisterAlert;
