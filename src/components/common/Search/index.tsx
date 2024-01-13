import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";

interface SearchProps {
  onSubmit: (data: string) => void;
  placeholder?: string;
}

const Search = ({ onSubmit, placeholder }: SearchProps) => {
  const { register, handleSubmit } = useForm<{ search: string }>();

  return (
    <Box
      as={"form"}
      onSubmit={handleSubmit(
        useCallback((data) => onSubmit(data.search), [onSubmit])
      )}
    >
      <InputGroup>
        <Input
          placeholder={placeholder ?? "Search..."}
          {...register("search")}
        />
        <InputRightElement>
          <Icon as={IoSearchOutline} />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default Search;
