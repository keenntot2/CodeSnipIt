import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
} from "@chakra-ui/react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";
import { languageMap } from "../initialData/languageData";

const LanguageMenu = () => {
  const { data, isError, isFetching } = useLanguage();
  const params = useParams<Readonly<{ languageSlug: string }>>();
  const navigate = useNavigate();

  if (isError) return null;
  if (isFetching) return <Spinner />;
  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} rightIcon={<FaAngleDown />}>
        {params.languageSlug ? languageMap[params.languageSlug] : "Languages"}
      </MenuButton>
      <MenuList maxH={400} overflowY="scroll">
        {data.results.map((l) => (
          <MenuItem
            key={l.id}
            onClick={() => {
              navigate(`/${l.slug}`);
            }}
          >
            {languageMap[l.slug]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default LanguageMenu;
