import { Editor } from "@/components";

const FormFieldEditor = ({
  value,
  onChange,
  ...rest
}: React.ComponentProps<typeof Editor>) => {
  return (
    <Editor value={value ?? "Hello, World!"} onChange={onChange} {...rest} />
  );
};

export default FormFieldEditor;
