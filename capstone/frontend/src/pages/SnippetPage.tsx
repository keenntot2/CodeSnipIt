import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CodeBlock from "../components/CodeBlock";
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
            <CodeBlock code={snippet?.code} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default SnippetPage;
