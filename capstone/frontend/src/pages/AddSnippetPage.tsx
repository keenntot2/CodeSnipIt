import { Box, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { useRef } from "react";
import { useParams } from "react-router-dom";

const AddSnippetPage = () => {
  const params = useParams();
  console.log(params.languageSlug);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = () => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 1.778}px`;

      // count lines
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
      const textareaHeight = textarea.scrollHeight;
      const numberOfLines = Math.floor(textareaHeight / lineHeight);
      console.log("Number of lines:", numberOfLines);
    }
  };

  return (
    <>
      <Text>{`Add ${params.languageSlug} code snippet`}</Text>
      <Box>
        <form>
          <Text>Title:</Text>
          <Input type="text" />

          <Text>Code:</Text>
          <HStack>
            <Textarea
              resize="none"
              ref={textareaRef}
              onChange={handleInputChange}
              overflow={"hidden"}
              rows={5}
            />
          </HStack>
        </form>
      </Box>
    </>
  );
};

export default AddSnippetPage;
