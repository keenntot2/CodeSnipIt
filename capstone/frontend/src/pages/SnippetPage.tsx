import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useSnippetListStore from "../hooks/useSnippetListStore";

const SnippetPage = () => {
  const { snippets, isSuccess } = useSnippetListStore();
  const params = useParams();

  const snippet =
    (isSuccess && snippets.results.find((s) => s.slug == params.snippetSlug)) ||
    undefined;

  return (
    <Box>
      <Text>Snippet Page</Text>
      {isSuccess && (
        <>
          <Heading>{snippet?.title}</Heading>
          <Text as="code">{snippet?.code}</Text>
        </>
      )}
    </Box>
  );
};

export default SnippetPage;
