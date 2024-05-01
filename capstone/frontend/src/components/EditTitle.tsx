import { Input } from "@chakra-ui/react";
import useAddSnippetValueStore from "../hooks/useAddSnippetValueStore";
import { ChangeEvent } from "react";

const EditTitle = () => {
  const { titleValue, setTitle, setTitleError } = useAddSnippetValueStore();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.length == 0) {
      setTitleError(true);
    }
  };

  return (
    <Input
      type="text"
      value={titleValue}
      fontSize="20px"
      fontWeight="700"
      onChange={handleTitleChange}
    />
  );
};

export default EditTitle;
