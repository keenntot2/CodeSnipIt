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
import React, { useEffect, useState } from "react";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";

interface Props {
  setIsEdit: (bool: boolean) => void;

  title?: string;
  code?: string;
}

const DiscardEditAlert = ({ setIsEdit, title, code }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { titleValue, codeValue } = useAddSnippetValueStore();
  const [isSame, setIsSame] = useState(true);
  const cancelRef = React.useRef(null);

  useEffect(() => {
    if (titleValue != title || codeValue != code) {
      setIsSame(false);
    } else {
      setIsSame(true);
    }
  }, [title, code, titleValue, codeValue]);

  return (
    <>
      <Button
        colorScheme="red"
        onClick={() => {
          if (isSame) {
            setIsEdit(false);
          } else {
            onOpen();
          }
        }}
      >
        Discard
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to discard the changes made?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                setIsEdit(false);
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

export default DiscardEditAlert;
