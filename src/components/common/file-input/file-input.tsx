import { Input } from "@chakra-ui/react";
import { forwardRef } from "react";

interface FileInputProps {
  onChange?: (file: File) => void;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ onChange }, forwardedRef) => {
    return (
      <Input
        ref={forwardedRef}
        type={"file"}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          onChange?.(file);
        }}
      />
    );
  }
);

export default FileInput;

FileInput.displayName = "FileInput";
