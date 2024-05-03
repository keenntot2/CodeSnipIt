import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAddSnippet from "../hooks/useAddSnippet";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";
import { languageData } from "../initialData/languageData";

const AddSnippetPage = () => {
  const {
    titleValue,
    codeValue,
    errors,
    setTitle,
    setCode,
    setTitleError,
    setCodeError,
    reset,
  } = useAddSnippetValueStore();

  const { mutate, isPending, error, data, isSuccess } = useAddSnippet();
  const [isConflict, setIsConflict] = useState(false);
  const [noOfLines, setNoOfLines] = useState(5);
  const [isDisabled, setIsDisabled] = useState(true);
  const params = useParams();

  const navigate = useNavigate();

  const defaultBorderColor = useColorModeValue(
    "#e2e8f0",
    "rgba(255,255,255,0.16)"
  );
  const borderColor = useColorModeValue("#3182ce", "#63b3ed");
  const errorBorderColor = useColorModeValue("#E53E3E", "#FC8181");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (error?.response?.status == 409) {
      setIsConflict(true);
    } else {
      setIsConflict(false);
    }
  }, [error]);

  useEffect(() => {
    const isDisabledError =
      errors.title ||
      errors.code ||
      titleValue.trim().length == 0 ||
      codeValue.trim().length == 0 ||
      isConflict;

    if (isDisabledError) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [errors, titleValue, codeValue, isConflict]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate(`/${data.language}/${data.slug}`);
    }
  }, [isSuccess]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      // count lines
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const textareaHeight = textarea.scrollHeight;
      const numberOfLines = Math.floor(textareaHeight / lineHeight);
      setNoOfLines(numberOfLines);
    }

    if (e.target.value.trim().length == 0) {
      setCodeError(true);
    } else if (errors.code && e.target.value.trim().length > 0) {
      setCodeError(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsConflict(false);
    if (e.target.value.trim().length == 0) {
      setTitleError(true);
    } else if (errors.title && e.target.value.trim().length > 0) {
      setTitleError(false);
    }
  };

  const slugtoTitle = (slug: string | undefined) => {
    const language = languageData.results.find((r) => r.slug == slug);
    return language?.language;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisabled && params.languageSlug && !isConflict) {
      mutate({
        language_slug: params.languageSlug,
        title: titleValue,
        code: codeValue,
      });
    }
  };

  return (
    <>
      <Heading mb={10} as="h1">{`Add ${slugtoTitle(
        params.languageSlug
      )} code snippet`}</Heading>
      <Box>
        <form className="code-form" onSubmit={(e) => handleSubmit(e)}>
          <Box>
            <FormControl isInvalid={errors.title || isConflict}>
              <FormLabel>
                <Heading as="h2" size="md">
                  Title:
                </Heading>
              </FormLabel>
              <Input
                type="text"
                value={titleValue}
                onChange={(e) => handleTitleChange(e)}
              />
              <FormErrorMessage>
                {errors.title
                  ? "Field cannot be empty."
                  : "This title is already existing."}
              </FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl isInvalid={errors.code}>
              <FormLabel>
                <Heading as="h2" size="md">
                  Code:
                </Heading>
              </FormLabel>
              <HStack
                _focusWithin={{
                  border: "1px solid #ffffff00",
                  zIndex: "1",
                  boxShadow: `0 0 1px ${borderColor}`,
                  outline: `2px solid ${borderColor}`,
                }}
                outline={
                  errors.code
                    ? `2px solid ${errorBorderColor}`
                    : "2px solid transparent"
                }
                border={
                  errors.code
                    ? `1px solid ${errorBorderColor}`
                    : `1px solid ${defaultBorderColor}`
                }
                boxShadow={errors.code ? `0 0 1px ${errorBorderColor}` : "none"}
                paddingBlock="16px"
                borderRadius="6px"
                paddingInline="32px"
                transition=" 0.2s ease-in-out"
                backgroundColor="rgb(1, 22, 39)"
              >
                <VStack spacing={0}>
                  {[...Array(noOfLines).keys()].map((index) => (
                    <Text
                      key={index}
                      lineHeight={"30px"}
                      color="gray.400"
                      cursor={"default"}
                      userSelect="none"
                    >
                      {index + 1}
                    </Text>
                  ))}
                </VStack>
                <Textarea
                  letterSpacing="1px"
                  resize="none"
                  ref={textareaRef}
                  onChange={(e) => handleTextareaChange(e)}
                  overflow={"hidden"}
                  rows={5}
                  variant="unstyled"
                  ml={5}
                  spellCheck={false}
                  lineHeight={"30px"}
                  value={codeValue}
                />
              </HStack>
              <FormErrorMessage>Field cannot be empty.</FormErrorMessage>
            </FormControl>
          </Box>
          <Button
            type="submit"
            w={"max-content"}
            alignSelf={"start"}
            size={"lg"}
            isDisabled={isDisabled}
            isLoading={isPending}
            loadingText="Saving"
          >
            Save
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddSnippetPage;
