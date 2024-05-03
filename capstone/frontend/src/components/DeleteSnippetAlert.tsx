import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Snippet } from "../hooks/useAddSnippet";
import useDeleteSnippet from "../hooks/useDeleteSnippet";

interface Props {
  snippet?: Snippet;
}

const DeleteSnippetAlert = ({ snippet }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { mutate } = useDeleteSnippet();
  const navigate = useNavigate();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        <Icon as={MdDeleteOutline} boxSize={5} />
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
          <AlertDialogHeader>{`Delete "${snippet?.title}"?`}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete this code snippet?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                if (snippet) {
                  mutate({ slug: snippet?.slug });
                  navigate("/");
                }
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

export default DeleteSnippetAlert;
