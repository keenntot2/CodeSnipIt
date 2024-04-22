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
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { languageData } from "../initialData/languageData";

const AddSnippetPage = () => {
  const color = useColorModeValue("gray.200", "whiteAlpha.300");
  const borderColor = useColorModeValue("#3182ce", "#63b3ed");
  const errorBorderColor = useColorModeValue("#E53E3E", "#FC8181");
  const params = useParams();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [noOfLines, setNoOfLines] = useState(5);
  const [state, setState] = useState({ title: false, code: false });

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      setState({ ...state, code: true });
    } else {
      setState({ ...state, code: false });
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length == 0) {
      setState({ ...state, title: true });
    } else {
      setState({ ...state, title: false });
    }
  };

  const slugtoTitle = (slug: string | undefined) => {
    const language = languageData.results.find((r) => r.slug == slug);
    return language?.language;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Heading mb={10} as="h1">{`Add ${slugtoTitle(
        params.languageSlug
      )} code snippet`}</Heading>
      <Box>
        <form className="code-form" onSubmit={(e) => handleSubmit(e)}>
          <Box>
            <FormControl isInvalid={state.title}>
              <FormLabel>
                <Heading as="h2" size="md">
                  Title:
                </Heading>
              </FormLabel>
              <Input type="text" onChange={(e) => handleTitleChange(e)} />
              <FormErrorMessage>Field cannot be empty.</FormErrorMessage>
            </FormControl>
          </Box>

          <Box>
            <FormControl isInvalid={state.code}>
              <FormLabel>
                <Heading as="h2" size="md">
                  Code:
                </Heading>
              </FormLabel>
              <HStack
                // ringColor="rgba(66, 153, 225, 0.6)"
                _focusWithin={{
                  border: "1px solid #ffffff00",
                  zIndex: "1",
                  boxShadow: `0 0 1px ${borderColor}`,
                  outline: `2px solid ${borderColor}`,
                }}
                outline={
                  state.code
                    ? `2px solid ${errorBorderColor}`
                    : "2px solid transparent"
                }
                border={state.code ? `1px solid ${errorBorderColor}` : "1px"}
                boxShadow={state.code ? `0 0 1px ${errorBorderColor}` : "none"}
                paddingBlock="16px"
                borderRadius="6px"
                paddingInline="32px"
                transition=" 0.2s ease-in-out"
              >
                <VStack spacing={0}>
                  {[...Array(noOfLines).keys()].map((index) => (
                    <Text
                      key={index}
                      borderBlock={0}
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
                  fontFamily="Monaco,Consolas,monospace"
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
                />
              </HStack>
              <FormErrorMessage>Field cannot be empty.</FormErrorMessage>
            </FormControl>
          </Box>
          <Button type="submit" w={"max-content"} alignSelf={"end"} size={"lg"}>
            Save
          </Button>
        </form>
      </Box>
    </>
  );
};

export default AddSnippetPage;
