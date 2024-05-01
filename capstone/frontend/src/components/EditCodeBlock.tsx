import { HStack, Textarea, VStack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";

const EditCodeBlock = () => {
  const { codeValue, setCode, setCodeError } = useAddSnippetValueStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [noOfLines, setNoOfLines] = useState(5);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `auto`;
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const lineHeight = parseInt(
        getComputedStyle(textareaRef.current).lineHeight
      );
      const noOfLines = Math.floor(
        textareaRef.current.scrollHeight / lineHeight
      );
      setNoOfLines(noOfLines);
    }
  }, [textareaRef.current]);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length == 0) {
      setCodeError(true);
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      const lineHeight = parseInt(
        getComputedStyle(textareaRef.current).lineHeight
      );
      const noOfLines = Math.floor(
        textareaRef.current.scrollHeight / lineHeight
      );
      setNoOfLines(noOfLines);
    }
    setCode(e.target.value);
  };

  return (
    <HStack alignItems="start" padding="8px" spacing={0}>
      <VStack spacing={0}>
        {[...Array(noOfLines).keys()].map((index) => (
          <Text
            minW="2.25em"
            textAlign="right"
            padding="0px 16px 0px 0px"
            key={index}
            color="gray.400"
            cursor={"default"}
            userSelect="none"
            lineHeight={1.5}
          >
            {index + 1}
          </Text>
        ))}
      </VStack>
      <Textarea
        p={0}
        border={0}
        value={codeValue}
        resize="none"
        ref={textareaRef}
        onChange={(e) => handleTextareaChange(e)}
        overflow="hidden"
        lineHeight={1.5}
        variant="unstyled"
        spellCheck={false}
        rows={1}
      />
    </HStack>
  );
};

export default EditCodeBlock;
