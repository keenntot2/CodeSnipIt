import { Button } from "@chakra-ui/react";
import useSnippetList from "../hooks/useSnippetList";
import { useEffect } from "react";
import useSnippetListStore from "../hooks/useSnippetListStore";
import { useNavigate } from "react-router-dom";

interface Props {
  language: string;
}

const SnippetList = ({ language }: Props) => {
  const { data, isSuccess } = useSnippetList();
  const addSnippets = useSnippetListStore((s) => s.addSnippets);
  const setIsSuccess = useSnippetListStore((s) => s.setIsSuccess);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      addSnippets(data);
      setIsSuccess(isSuccess);
    }
  }, [isSuccess]);

  return (
    <>
      {isSuccess &&
        data.results
          .filter((snippet) => snippet.language === language)
          .map((snippet) => (
            <Button
              key={snippet.id}
              size="sm"
              onClick={() => navigate(`/${snippet.language}/${snippet.slug}`)}
            >
              {snippet.title}
            </Button>
          ))}
    </>
  );
};

export default SnippetList;
