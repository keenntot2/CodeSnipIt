import { Grid, GridItem } from "@chakra-ui/react";
import LanguageList from "../components/LanguageList";
import MainSection from "../components/MainSection";

const HomePage = () => {
  return (
    <Grid templateAreas={`"side main"`} gridTemplateColumns={"250px 1fr"}>
      <GridItem>
        <LanguageList />
      </GridItem>
      <GridItem>
        <MainSection />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
