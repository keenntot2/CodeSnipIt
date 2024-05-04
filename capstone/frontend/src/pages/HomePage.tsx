import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SnippetCard from "../components/SnippetCard";
import { Snippet } from "../hooks/useAddSnippet";
import useSnippetListStore from "../hooks/useSnippetListStore";

const HomePage = () => {
  const [snippets, setSnippets] = useState<Snippet[]>();
  const snippetsStore = useSnippetListStore((s) => s.snippets);
  const parseDate = (dateString: string) => new Date(dateString).getTime();

  useEffect(() => {
    if (snippetsStore.results) {
      const sortedSnippets = [...snippetsStore.results].sort(
        (a, b) => parseDate(b.edited_at) - parseDate(a.edited_at)
      );
      setSnippets(sortedSnippets);
    }
  }, [snippetsStore]);

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
      {snippets &&
        snippets.map((snippet) => (
          <SnippetCard snippet={snippet} key={snippet.id} />
        ))}
    </SimpleGrid>
  );
};

export default HomePage;
