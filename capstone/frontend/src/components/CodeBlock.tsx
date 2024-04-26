import { HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface Props {
  code?: string;
}

const CodeBlock = ({ code }: Props) => {
  const [noOfLines, setNoOfLines] = useState(0);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      const height = codeRef.current.clientHeight;
      const lineHeight = parseInt(getComputedStyle(codeRef.current).lineHeight);
      const noOfLines = Math.floor(height / lineHeight);
      setNoOfLines(noOfLines);
    }
  }, [code]);

  return (
    <HStack
      backgroundColor="rgb(1, 22, 39)"
      alignItems="start"
      padding={10}
      width="100%"
      borderRadius="0px 0px 10px 10px"
    >
      <VStack spacing={0}>
        {[...Array(noOfLines).keys()].map((index) => (
          <Text key={index} color="gray.400" lineHeight="30px">
            {index + 1}
          </Text>
        ))}
      </VStack>
      <Text
        as="code"
        color="white"
        p="10px"
        whiteSpace="pre-wrap"
        ref={codeRef}
        paddingBlock={0}
        lineHeight="30px"
        ml={5}
      >
        {code}
      </Text>
    </HStack>
  );
};

export default CodeBlock;
