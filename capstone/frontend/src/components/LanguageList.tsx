import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  HStack,
  Spinner,
  Text,
} from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

import { FaAngleDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const LanguageList = () => {
  const { data, isError, isFetching } = useLanguage();
  const navigate = useNavigate();

  if (isError) return null;
  if (isFetching) return <Spinner />;

  return (
    <HStack spacing={10} h="100%" alignItems="start">
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
              <Button
                variant={"outline"}
                size={"xs"}
                gap={2}
                mt={5}
                onClick={() => navigate(`/${language.slug}/add-snippet`)}
              >
                <IoMdAdd />
                Add snippet
              </Button>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Divider orientation="vertical" h="inherit" />
    </HStack>
  );
};

export default LanguageList;
