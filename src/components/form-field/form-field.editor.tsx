import { Editor } from "@/components";

const FormFieldEditor = ({
  defaultValue,
  onChange,
  ...rest
}: React.ComponentProps<typeof Editor>) => {
  return (
    <Editor
      defaultValue={defaultValue ?? "Hello, World!"}
      onChange={onChange}
      {...rest}
    />
  );
};

export default FormFieldEditor;
