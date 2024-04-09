import { Button, VStack } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

const LanguageList = () => {
  const { isSuccess, data } = useLanguage();

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
