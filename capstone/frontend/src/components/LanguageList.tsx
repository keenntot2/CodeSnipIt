import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

import { FaAngleDown } from "react-icons/fa";

const LanguageList = () => {
  const { data, isError } = useLanguage();

  if (isError) return null;

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

          <AccordionPanel ml={5}>{language.slug}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default LanguageList;
