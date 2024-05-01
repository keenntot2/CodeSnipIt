import { Button, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useIsEditStore, { LanguageSlugParams } from "../hooks/useIsEditStore";
import useSnippetList from "../hooks/useSnippetList";
import useSnippetListStore from "../hooks/useSnippetListStore";

interface Props {
  language: string;
}

const SnippetList = ({ language }: Props) => {
  const { data, isSuccess, isLoading } = useSnippetList();
  const addSnippets = useSnippetListStore((s) => s.addSnippets);
  const setIsSuccess = useSnippetListStore((s) => s.setIsSuccess);
  const navigate = useNavigate();
  const params = useParams<Readonly<LanguageSlugParams>>();
  const { isEdit, setSlug } = useIsEditStore();

  useEffect(() => {
    if (isSuccess) {
      addSnippets(data);
      setIsSuccess(isSuccess);
    }
  }, [isSuccess]);

  if (isLoading) return <Spinner />;

  return (
    <>
      {isSuccess &&
        data.results
          .filter((snippet) => snippet.language === language)
          .map((snippet) => (
            <Button
              isActive={params.snippetSlug === snippet.slug}
              key={snippet.id}
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
              {snippet.title}
            </Button>
          ))}
    </>
  );
};

export default SnippetList;
