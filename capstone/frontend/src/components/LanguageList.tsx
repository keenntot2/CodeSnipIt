import { Button, VStack } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

const LanguageList = () => {
  const { data, isError } = useLanguage();

  if (isError) return null;

  return (
    <VStack alignItems={"start"}>
      {data.results.map((language) => (
        <Button key={language.id} size={"sm"} variant={"ghost"}>
          {language.language}
        </Button>
      ))}
    </VStack>
  );
};

export default LanguageList;
