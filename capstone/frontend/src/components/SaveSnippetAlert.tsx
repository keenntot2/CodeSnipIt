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
import usePatchSnippet from "../hooks/usePatchSnippet";
import { useParams } from "react-router-dom";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";

interface Props {
  setIsEdit: (bool: boolean) => void;
}

const SaveSnippetAlert = ({ setIsEdit }: Props) => {
  const { titleValue, codeValue, errors, reset } = useAddSnippetValueStore();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const params = useParams();
  const { mutate } = usePatchSnippet(params.snippetSlug);

  const handleClick = () => {
    if (!errors.code && !errors.title) {
      mutate({
        title: titleValue,
        code: codeValue,
      });
    }
    setIsEdit(false);
    reset();
  };

  return (
    <>
      <Button colorScheme="green" onClick={onOpen}>
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

        <AlertDialogContent>
          <AlertDialogHeader>Save Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to save these changes?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="green" ml={3} onClick={handleClick}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SaveSnippetAlert;
