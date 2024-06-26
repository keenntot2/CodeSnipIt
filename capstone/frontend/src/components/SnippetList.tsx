import { Button, Icon, Spinner, Text, Tooltip } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useIsEditStore, { LanguageSlugParams } from "../hooks/useIsEditStore";
import useSnippetList from "../hooks/useSnippetList";

import { FaFileCode } from "react-icons/fa";

import shortenText from "../utils/shortenText";

interface Props {
  language: string;
}

const MIN_CHAR = 15;

const SnippetList = ({ language }: Props) => {
  const { data, isSuccess, isLoading } = useSnippetList();

  const navigate = useNavigate();
  const params = useParams<Readonly<LanguageSlugParams>>();
  const { isEdit, setSlug } = useIsEditStore();

  if (isLoading) return <Spinner />;

  return (
    <>
      {isSuccess &&
        data.results
          .filter((snippet) => snippet.language === language)
          .map((snippet) => (
            <Tooltip
              key={snippet.id}
              label={snippet.title}
              placement="right"
              openDelay={600}
              hasArrow
              isDisabled={snippet.title.length <= MIN_CHAR}
            >
              <Button
                variant="ghost"
                isActive={params.snippetSlug === snippet.slug}
                size="sm"
                onClick={() => {
                  setSlug({
                    languageSlug: snippet.language,
                    snippetSlug: snippet.slug,
                  });

                  if (!isEdit) {
                    navigate(`/${snippet.language}/${snippet.slug}`);
                  }
                }}
              >
                <Icon as={FaFileCode} boxSize={5} mr={2} />

                <Text>{shortenText(snippet.title, MIN_CHAR)}</Text>
              </Button>
            </Tooltip>
          ))}
    </>
  );
};

export default SnippetList;
