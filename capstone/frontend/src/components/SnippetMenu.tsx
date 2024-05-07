import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoMdCopy } from "react-icons/io";
import { MdDeleteOutline, MdOutlineMenu } from "react-icons/md";
import { Snippet } from "../hooks/useAddSnippet";
import useIsEditStore from "../hooks/useIsEditStore";
import DeleteSnippetAlert from "./DeleteSnippetAlert";

interface Props {
  snippet: Snippet;
}

const SnippetMenu = ({ snippet }: Props) => {
  const { setIsEdit } = useIsEditStore();
  const [clickDelete, setClickDelete] = useState(0);

  const handleClick = () => {
    setClickDelete(clickDelete + 1);
  };

  return (
    <Menu autoSelect={false}>
      <MenuButton as={Button} variant="outline">
        <MdOutlineMenu />
      </MenuButton>
      <MenuList minW="none">
        <MenuItem icon={<FaRegEdit />} onClick={() => setIsEdit(true)}>
          Edit
        </MenuItem>
        <MenuItem
          icon={<IoMdCopy />}
          onClick={() => {
            navigator.clipboard.writeText(snippet.code);
          }}
        >
          Copy
        </MenuItem>
        <MenuItem
          icon={<MdDeleteOutline />}
          _focus={{ backgroundColor: "red.300", color: "white" }}
          color="red.300"
          onClick={handleClick}
        >
          <DeleteSnippetAlert
            snippet={snippet}
            as="menuItem"
            handleDelete={clickDelete}
          />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SnippetMenu;
