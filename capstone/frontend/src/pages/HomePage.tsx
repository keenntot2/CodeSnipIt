import {
  Box,
  Button,
  Flex,
  HStack,
  Show,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LanguageMenu from "../components/LanguageMenu";
import SnippetCard from "../components/SnippetCard";
import { Snippet } from "../hooks/useAddSnippet";
import useSnippetList from "../hooks/useSnippetList";
import { languageMap } from "../initialData/languageData";
import { IoMdAdd } from "react-icons/io";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";

const HomePage = () => {
  const [snippets, setSnippets] = useState<Snippet[]>();
  const { data, isSuccess, isLoading } = useSnippetList();
  const [isLanguage, setIsLanguage] = useState(true);

  const parseDate = (dateString: string) => new Date(dateString).getTime();
  const params = useParams<Readonly<{ languageSlug: string }>>();
  const reset = useAddSnippetValueStore((s) => s.reset);
  const navigate = useNavigate();

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
    if (params.languageSlug && !languageMap[params.languageSlug]) {
      setIsLanguage(false);
    }
  }, [params.languageSlug, isSuccess, data]);

  if (!isLanguage)
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });

  return (
    <>
      <Box mb={5}>
        <HStack justifyContent="space-between">
          <LanguageMenu />
          {params.languageSlug && (
            <Show below="lg">
              <Button
                alignSelf="end"
                leftIcon={<IoMdAdd />}
                variant="outline"
                colorScheme="green"
                onClick={() => {
                  navigate(`/${params.languageSlug}/add-snippet`);
                  reset();
                }}
              >
                Add snippet
              </Button>
            </Show>
          )}
        </HStack>
      </Box>

      {isLoading ? (
        <Flex justifyContent="center">
          <Spinner size="lg" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {snippets &&
            snippets.map((snippet) => (
              <SnippetCard snippet={snippet} key={snippet.id} />
            ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default HomePage;
