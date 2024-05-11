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
  Text,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { Snippet } from "../hooks/useAddSnippet";
import useDeleteSnippet from "../hooks/useDeleteSnippet";

interface Props {
  snippet: Snippet;
  as?: "menuItem";
  handleDelete?: number;
}

const DeleteSnippetAlert = ({ snippet, as, handleDelete }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const { mutate } = useDeleteSnippet();
  const navigate = useNavigate();
  const params = useParams<Readonly<{ languageSlug: string }>>();

  useEffect(() => {
    if (handleDelete) {
      onOpen();
    }
  }, [handleDelete]);

  return (
    <>
      {as != "menuItem" ? (
        <Tooltip label="Delete" hasArrow placement="top">
          <Button colorScheme="red" onClick={onOpen}>
            <Icon as={MdDeleteOutline} boxSize={5} />
          </Button>
        </Tooltip>
      ) : (
        <Text>Delete</Text>
      )}
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent w={{ base: "300px", md: "auto" }}>
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
                  navigate(`/${params.languageSlug}`);
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
