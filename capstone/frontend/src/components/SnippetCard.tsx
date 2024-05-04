import {
  Badge,
  Box,
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Snippet } from "../hooks/useAddSnippet";
import { languageMap } from "../initialData/languageData";
import timeFormat from "../utils/timeFormat";
import { useNavigate } from "react-router-dom";
import shortenText from "../utils/shortenText";
import useIsEditStore from "../hooks/useIsEditStore";

interface Props {
  snippet: Snippet;
}

const SnippetCard = ({ snippet }: Props) => {
  const navigate = useNavigate();
  const { setSlug } = useIsEditStore();
  return (
    <Card
      overflow="hidden"
      _hover={{ transform: "scale(1.03)", cursor: "pointer" }}
      transition={"transform 0.15s ease-in"}
      onClick={() => {
        setSlug({ languageSlug: snippet.language, snippetSlug: snippet.slug });
        navigate(`/${snippet.language}/${snippet.slug}`);
      }}
    >
      <Box padding={5} backgroundColor="rgb(1, 22, 39)" minH="125px">
        <SyntaxHighlighter
          language={snippet?.language}
          style={nightOwl}
          showLineNumbers
          customStyle={{ overflow: "hidden" }}
        >
          {shortenText(snippet.code, 20)}
        </SyntaxHighlighter>
      </Box>
      <CardBody>
        <HStack justifyContent="space-between" alignItems="start" mb={5}>
          <Tooltip
            label={snippet.title}
            hasArrow
            placement="top"
            openDelay={600}
          >
            <Heading fontSize="xl">{shortenText(snippet.title, 15)}</Heading>
          </Tooltip>
          <Badge colorScheme="green">{languageMap[snippet.language]}</Badge>
        </HStack>
        <Heading as="dt" fontSize="md" color="gray.500">
          Last edited:
        </Heading>
        <Text as="dd" fontSize="sm" color="gray.500">
          {timeFormat(snippet.edited_at)}
        </Text>
      </CardBody>
    </Card>
  );
};

export default SnippetCard;
