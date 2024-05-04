import { Box, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LanguageMenu from "../components/LanguageMenu";
import SnippetCard from "../components/SnippetCard";
import { Snippet } from "../hooks/useAddSnippet";
import useSnippetList from "../hooks/useSnippetList";

const HomePage = () => {
  const [snippets, setSnippets] = useState<Snippet[]>();
  const { data, isSuccess } = useSnippetList();

  const parseDate = (dateString: string) => new Date(dateString).getTime();
  const params = useParams<Readonly<{ languageSlug: string }>>();

  useEffect(() => {
    if (isSuccess) {
      if (params.languageSlug && data?.results) {
        const sortedSnippets = [...data?.results].sort(
          (a, b) => parseDate(b.edited_at) - parseDate(a.edited_at)
        );
        setSnippets(
          sortedSnippets?.filter((s) => s.language === params.languageSlug)
        );
      }
      if (!params.languageSlug && data?.results) {
        const sortedSnippets = [...data?.results].sort(
          (a, b) => parseDate(b.edited_at) - parseDate(a.edited_at)
        );
        setSnippets(sortedSnippets);
      }
    }
  }, [params.languageSlug, isSuccess, data]);

  return (
    <>
      <Box mb={5}>
        <LanguageMenu />
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {snippets &&
          snippets.map((snippet) => (
            <SnippetCard snippet={snippet} key={snippet.id} />
          ))}
      </SimpleGrid>
    </>
  );
};

export default HomePage;
