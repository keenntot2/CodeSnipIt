import { Button } from "@chakra-ui/react";
import useSnippetList from "../hooks/useSnippetList";

interface Props {
  language: string;
}

const SnippetList = ({ language }: Props) => {
  const { data, isSuccess } = useSnippetList();

  return (
    <>
      {isSuccess &&
        data.results
          .filter((snippet) => snippet.language === language)
          .map((snippet) => <Button size="sm">{snippet.title}</Button>)}
    </>
  );
};

export default SnippetList;
