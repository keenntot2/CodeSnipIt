import {
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import DeleteSnippetAlert from "../components/DeleteSnippetAlert";
import DiscardEditAlert from "../components/DiscardEditAlert";
import EditCodeBlock from "../components/EditCodeBlock";
import EditTitle from "../components/EditTitle";
import SaveSnippetAlert from "../components/SaveSnippetAlert";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";
import useIsEditStore from "../hooks/useIsEditStore";
import useSnippetListStore from "../hooks/useSnippetListStore";

const SnippetPage = () => {
  const { snippets, isSuccess } = useSnippetListStore();
  const { reset, setCode, setTitle } = useAddSnippetValueStore();
  const { isEdit, setIsEdit } = useIsEditStore();

  const params = useParams();

  const headingBcolor = useColorModeValue(
    "RGBA(0, 0, 0, 0.36)",
    "rgba(255,255,255,0.16)"
  );

  const snippet =
    (isSuccess && snippets.results.find((s) => s.slug == params.snippetSlug)) ||
    undefined;

  useEffect(() => {
    if (isEdit && snippet) {
      setTitle(snippet?.title);
      setCode(snippet?.code);
    }
    if (!isEdit) {
      reset();
    }
  }, [isEdit]);

  return (
    <Box>
      <Box>
        {isSuccess && (
          <>
            <HStack
              paddingBlock={3}
              paddingInline={5}
              backgroundColor={headingBcolor}
              borderRadius="10px 10px 0px 0px"
              justifyContent="space-between"
            >
              {!isEdit ? (
                <Heading as="h1" size="md">
                  {snippet?.title}
                </Heading>
              ) : (
                <EditTitle />
              )}
              <HStack>
                {!isEdit ? (
                  <>
                    <Button onClick={() => setIsEdit(true)}>
                      <Icon as={FaRegEdit} />
                    </Button>
                    <Button
                      onClick={() => {
                        if (snippet?.code)
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
    </Box>
  );
};

export default SnippetPage;
