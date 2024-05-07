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
import useIsEditStore, { LanguageSlugParams } from "../hooks/useIsEditStore";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  title?: string;
  code?: string;
}

const DiscardEditAlert = ({ title, code }: Props) => {
  const { setIsEdit, slug: langSlug, prompt, setPrompt } = useIsEditStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { titleValue, codeValue } = useAddSnippetValueStore();
  const [isSame, setIsSame] = useState(true);
  const cancelRef = React.useRef(null);
  const navigate = useNavigate();
  const params = useParams<Readonly<LanguageSlugParams>>();
  const [isLangSlugSame, setIsLangSlugSame] = useState(true);

  useEffect(() => {
    if (
      langSlug.languageSlug != params.languageSlug ||
      langSlug.snippetSlug != params.snippetSlug
    ) {
      setIsLangSlugSame(false);
      onOpen();
      if (!isOpen) {
        navigate(`/${langSlug.languageSlug}/${langSlug.snippetSlug}`);
      }
    }
  }, [langSlug]);

  useEffect(() => {
    if (prompt) {
      onOpen();
    }
  }, [prompt]);

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

        <AlertDialogContent w={{ base: "300px", md: "auto" }}>
          <AlertDialogHeader>
            {isLangSlugSame ? "Discard Changes?" : "Exit edit mode?"}
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {isLangSlugSame
              ? "Are you sure you want to discard the changes made?"
              : "Are you sure you want to exit edit mode?"}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={() => {
                setPrompt(false);
                onClose();
              }}
            >
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                setPrompt(false);
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
