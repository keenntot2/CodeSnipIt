import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

import { FaAngleDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const LanguageList = () => {
  const { data, isError, isFetching } = useLanguage();

  if (isError) return null;
  if (isFetching) return <Spinner />;

  return (
    <Accordion allowToggle>
      {data.results.map((language) => (
        <AccordionItem key={language.id} borderRadius={5}>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left" paddingBlock={2}>
              {language.language}
            </Box>
            <FaAngleDown />
          </AccordionButton>

          <AccordionPanel ml={5}>
            <Text>{language.slug}</Text>
            <Button variant={"outline"} size={"xs"} gap={2} mt={5}>
              <IoMdAdd />
              Add snippet
            </Button>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LanguageList;
