import { Button, VStack } from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

const LanguageList = () => {
  const { isSuccess, data } = useLanguage();

  if (isSuccess) console.log(data);
  return (
    <VStack alignItems={"start"}>
      {data.results.map((language) => (
        <Button key={language.id}>{language.language}</Button>
      ))}
    </VStack>
  );
};

export default LanguageList;
