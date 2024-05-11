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

const LoginPage = () => {
  const loginRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    setTimeout(() => {
      if (heroRef.current) {
        window.onscroll = () => {
          const { top, height } = heroRef.current?.getBoundingClientRect() || {
            top: null,
            height: null,
          };
          if (top && height) {
            if (Math.abs(top) < 100) {
              setOpacity(1);
            } else {
              setOpacity((height * 0.8 - Math.abs(top)) / height);
            }
          }
        };
      }
    }, 1);
  }, []);

  return (
    <Flex minH="100dvh">
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
            <VStack w="100%" h="100dvh" p={5} ref={heroRef}>
              <Hero />
              <Button
                opacity={opacity}
                h="70px"
                w="100px"
                borderRadius={20}
                onClick={() => {
                  window.scrollTo({
                    top: loginRef.current?.offsetTop,
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
            ref={loginRef}
            w="100%"
            h="100dvh"
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
