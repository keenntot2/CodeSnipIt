import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Show,
  useColorModeValue,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DeleteSnippetAlert from "../components/DeleteSnippetAlert";
import DiscardEditAlert from "../components/DiscardEditAlert";
import EditCodeBlock from "../components/EditCodeBlock";
import EditTitle from "../components/EditTitle";
import LanguageIcon from "../components/LanguageIcon";
import SaveSnippetAlert from "../components/SaveSnippetAlert";
import SnippetMenu from "../components/SnippetMenu";
import fetchAllResponse from "../entities/FetchAllResponse";
import { Snippet } from "../hooks/useAddSnippet";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";
import useIsEditStore, { LanguageSlugParams } from "../hooks/useIsEditStore";
import { Language } from "../hooks/useLanguage";
import useSnippetList from "../hooks/useSnippetList";

const SnippetPage = () => {
  const { data, isSuccess } = useSnippetList();
  const { reset, setCode, setTitle } = useAddSnippetValueStore();
  const { isEdit, setIsEdit } = useIsEditStore();
  const [snippet, setSnippet] = useState<Snippet>();
  const params = useParams<Readonly<LanguageSlugParams>>();
  const queryClient = useQueryClient();
  const [stateParams, setStateParams] = useState({
    isLanguage: true,
    isSnippet: true,
  });

  const headingBcolor = useColorModeValue(
    "RGBA(0, 0, 0, 0.36)",
    "rgba(255,255,255,0.16)"
  );

  useEffect(() => {
    if (data?.results) {
      const findSnippet = data.results.find(
        (s) => s.slug == params.snippetSlug
      );
      if (!findSnippet) {
        setStateParams({ ...stateParams, isSnippet: false });
      }
      setSnippet(findSnippet);
    }
  }, [isSuccess, params, data]);

  useEffect(() => {
    setStateParams({ isLanguage: true, isSnippet: true });
    if (queryClient.getQueryData(["languages"])) {
      const languages = queryClient.getQueryData<fetchAllResponse<Language>>([
        "languages",
      ]);
      const isLanguage = languages?.results.find(
        (l) => l.slug === params.languageSlug
      );
      if (!isLanguage) {
        setStateParams({ ...stateParams, isLanguage: false });
      }
    }
  }, [queryClient, params]);

  useEffect(() => {
    if (isEdit && snippet) {
      setTitle(snippet?.title);
      setCode(snippet?.code);
    }
    if (!isEdit) {
      reset();
    }
  }, [isEdit]);

  if (!stateParams.isLanguage || !stateParams.isSnippet)
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });

  return (
    <Box width="100%">
      {snippet && (
        <>
          <HStack
            paddingBlock={3}
            paddingInline={5}
            backgroundColor={headingBcolor}
            borderRadius="10px 10px 0px 0px"
            justifyContent="space-between"
          >
            {!isEdit ? (
              <HStack>
                <LanguageIcon language={snippet.language} />
                <Divider
                  orientation="vertical"
                  flexGrow="1"
                  alignSelf="stretch"
                  h="auto"
                />

                <Heading as="h1" size={{ base: "sm", lg: "md" }}>
                  {snippet?.title}
                </Heading>
              </HStack>
            ) : (
              <EditTitle />
            )}
            <Show below="lg">
              {!isEdit ? (
                <SnippetMenu snippet={snippet} />
              ) : (
                <>
                  <DiscardEditAlert
                    title={snippet?.title}
                    code={snippet?.code}
                  />
                  <SaveSnippetAlert />
                </>
              )}
            </Show>
            <Show above="lg">
              <HStack>
                {!isEdit ? (
                  <>
                    <Button onClick={() => setIsEdit(true)}>
                      <Icon as={FaRegEdit} />
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(snippet?.code);
                      }}
                    >
                      <HStack>
                        <Icon as={IoMdCopy} boxSize={5} />
                      </HStack>
                    </Button>
                    <DeleteSnippetAlert snippet={snippet} />
                  </>
                ) : (
                  <>
                    <DiscardEditAlert
                      title={snippet?.title}
                      code={snippet?.code}
                    />
                    <SaveSnippetAlert />
                  </>
                )}
              </HStack>
            </Show>
          </HStack>

          <Box
            padding={5}
            backgroundColor="rgb(1, 22, 39)"
            borderRadius="0px 0px 10px 10px"
          >
            {!isEdit ? (
              <SyntaxHighlighter
                language={snippet?.language}
                style={nightOwl}
                showLineNumbers
              >
                {snippet?.code}
              </SyntaxHighlighter>
            ) : (
              <EditCodeBlock />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SnippetPage;
