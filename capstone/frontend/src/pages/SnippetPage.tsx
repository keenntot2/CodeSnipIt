import {
  Box,
  HStack,
  Heading,
  useColorModeValue,
  Text,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useSnippetListStore from "../hooks/useSnippetListStore";
import { IoMdCopy } from "react-icons/io";

const SnippetPage = () => {
  const { snippets, isSuccess } = useSnippetListStore();
  const params = useParams();

  const headingBcolor = useColorModeValue(
    "RGBA(0, 0, 0, 0.36)",
    "rgba(255,255,255,0.16)"
  );

  const snippet =
    (isSuccess && snippets.results.find((s) => s.slug == params.snippetSlug)) ||
    undefined;

  return (
    <Box>
      <Box>
        {isSuccess && (
          <>
            <HStack
              padding={5}
              backgroundColor={headingBcolor}
              borderRadius="10px 10px 0px 0px"
              justifyContent="space-between"
            >
              <Heading as="h1" size="md">
                {snippet?.title}
              </Heading>
              <Button
                variant="outline"
                onClick={() => {
                  if (snippet?.code)
                    navigator.clipboard.writeText(snippet?.code);
                }}
              >
                <HStack>
                  <Icon as={IoMdCopy} boxSize={5} />
                  <Text>Copy</Text>
                </HStack>
              </Button>
            </HStack>

            <Box
              padding={5}
              backgroundColor="rgb(1, 22, 39)"
              borderRadius="0px 0px 10px 10px"
            >
              {snippet?.code && (
                <SyntaxHighlighter
                  language={snippet?.language}
                  style={nightOwl}
                  showLineNumbers
                >
                  {snippet?.code}
                </SyntaxHighlighter>
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SnippetPage;
