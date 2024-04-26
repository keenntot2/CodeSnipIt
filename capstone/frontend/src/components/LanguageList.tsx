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
  VStack,
} from "@chakra-ui/react";
import useLanguage from "../hooks/useLanguage";

import { FaAngleDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";
import SnippetList from "./SnippetList";

const LanguageList = () => {
  const { data, isError, isFetching } = useLanguage();
  const reset = useAddSnippetValueStore((s) => s.reset);
  const navigate = useNavigate();
  const params = useParams();

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
              <VStack spacing={2} alignItems="start">
                <SnippetList language={language.slug} />
              </VStack>

              <Button
                variant={"outline"}
                size={"xs"}
                gap={2}
                mt={5}
                onClick={() => {
                  if (params.languageSlug != language.slug) {
                    reset();
                    navigate(`/${language.slug}/add-snippet`);
                  }
                }}
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
