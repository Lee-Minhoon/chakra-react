import { Box } from "@chakra-ui/react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import editorCSS from "./css";

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  [{ script: "sub" }, { script: "super" }],
  ["link", "image", "code-block"],
  ["clean"],
];

interface EditorProps {
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Editor = ({ defaultValue = "", onChange }: EditorProps) => {
  const quill = useRef<Quill>();
  const isLoaded = useRef(false);

  useEffect(() => {
    (async () => {
      if (isLoaded.current) return;
      isLoaded.current = true;
      const { default: Quill } = await import("quill");
      quill.current = new Quill("#editor", {
        theme: "snow",
        modules: {
          toolbar: toolbarOptions,
        },
      });
      if (!onChange) return;
      quill.current.on("text-change", () => {
        onChange(quill.current!.root.innerHTML);
      });
      quill.current.root.innerHTML = defaultValue;
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onChange]);

  return (
    <Box css={editorCSS}>
      <Box id="editor" h={"lg"} />
    </Box>
  );
};

export default Editor;
