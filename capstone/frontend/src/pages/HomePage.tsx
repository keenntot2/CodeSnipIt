import { Grid, GridItem } from "@chakra-ui/react";
import LanguageList from "../components/LanguageList";
import Main from "../components/Main";

const HomePage = () => {
  return (
    <Grid templateAreas={`"side main"`} gridTemplateColumns={"200px 1fr"}>
      <GridItem>
        <LanguageList />
      </GridItem>
      <GridItem>
        <Main />
      </GridItem>
    </Grid>
  );
};

export default HomePage;
