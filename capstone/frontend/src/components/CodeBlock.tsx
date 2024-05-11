import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Icon,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";
import LanguageIcon from "../components/LanguageIcon";

const CodeBlock = () => {
  const headingBcolor = useColorModeValue(
    "RGBA(0, 0, 0, 0.36)",
    "rgba(255,255,255,0.16)"
  );

  return (
    <>
      <HStack
        paddingBlock={2}
        paddingInline={2}
        backgroundColor={headingBcolor}
        borderRadius="10px 10px 0px 0px"
        justifyContent="space-between"
      >
        <HStack ml={2}>
          <LanguageIcon language={"python"} />
          <Divider orientation="vertical" alignSelf="stretch" h="auto" />
          <Heading as="h1" size="sm">
            Hello, World!
          </Heading>
        </HStack>
        <HStack>
          <Tooltip label="Edit" placement="top" hasArrow>
            <Button size="sm">
              <Icon as={FaRegEdit} />
            </Button>
          </Tooltip>
          <Tooltip label="Copy" placement="top" hasArrow>
            <Button
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText('print("Hello, World!")');
              }}
            >
              <HStack>
                <Icon as={IoMdCopy} boxSize={5} />
              </HStack>
            </Button>
          </Tooltip>
          <Tooltip label="Delete" placement="top" hasArrow>
            <Button colorScheme="red" size="sm">
              <Icon as={MdDeleteOutline} boxSize={5} />
            </Button>
          </Tooltip>
        </HStack>
      </HStack>
      <Box
        fontSize="xs"
        padding={5}
        backgroundColor="rgb(1, 22, 39)"
        borderRadius="0px 0px 10px 10px"
      >
        <SyntaxHighlighter language={"python"} style={nightOwl} showLineNumbers>
          {`print("Hello, World!")`}
        </SyntaxHighlighter>
      </Box>
    </>
  );
};

export default CodeBlock;
