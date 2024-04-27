import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import useSnippetListStore from "../hooks/useSnippetListStore";

const SnippetPage = () => {
  const { snippets, isSuccess } = useSnippetListStore();
  const params = useParams();

  const headingBcolor = useColorModeValue("#CBD5E0", "rgba(255,255,255,0.16)");

  const snippet =
    (isSuccess && snippets.results.find((s) => s.slug == params.snippetSlug)) ||
    undefined;

  return (
    <Box>
      <Box>
        {isSuccess && (
          <>
            <Heading
              as="h1"
              size="md"
              backgroundColor={headingBcolor}
              padding={5}
              borderRadius="10px 10px 0px 0px"
            >
              {snippet?.title}
            </Heading>

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
