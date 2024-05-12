import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Icon,
  Show,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import Hero from "../components/Hero";
import LoginForm from "../components/LoginForm";
import { useMotionValueEvent, useScroll } from "framer-motion";
import ColorModeSwitch from "../components/ColorModeSwitch";

const LoginPage = () => {
  const loginRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    console.log("Page scroll: ", latest);

    if (heroRef.current) {
      const { top, height } = heroRef.current?.getBoundingClientRect() || {
        top: null,
        height: null,
      };
      if (top && height) {
        if (Math.abs(top) >= height * 0.6) {
          setOpacity(0);
        } else {
          setOpacity(1);
        }
      }
    }
  });

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <Flex minH="100svh" position="relative">
      <Box position={"absolute"} top={5} left={5}>
        <ColorModeSwitch />
      </Box>
      <Grid
        w="100%"
        templateAreas={{ base: `'form'`, lg: `"hero form"` }}
        gridTemplateColumns={{ base: "100%", lg: "65% 1fr" }}
      >
        <Show above="lg">
          <GridItem area="hero">
            <Hero />
          </GridItem>
        </Show>

        <GridItem area="form">
          <Show below="lg">
            <VStack w="100%" h="100svh" p={5} ref={heroRef}>
              <Hero />
              <Button
                opacity={opacity}
                h="70px"
                w="100px"
                borderRadius={20}
                onClick={() => {
                  window.scrollTo({
                    top: heroRef.current?.offsetHeight,
                    behavior: "smooth",
                  });
                }}
              >
                <VStack>
                  <Text fontSize="xl">Login</Text>
                  <Icon as={FaAngleDown} />
                </VStack>
              </Button>
            </VStack>
          </Show>
          <Box
            overflow="hidden"
            ref={loginRef}
            w="100%"
            h="100svh"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <LoginForm />
          </Box>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default LoginPage;
