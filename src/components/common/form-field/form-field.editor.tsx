import { Editor } from "@/components";
import { Control, Controller, FieldPath } from "react-hook-form";

interface FormFieldEditorProps
  extends Omit<React.ComponentProps<typeof Editor>, "name"> {
  name: FieldPath<any>;
  control?: Control<any, any>;
}

const FormFieldEditor = ({ name, control, ...rest }: FormFieldEditorProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <Editor
            defaultValue={value ?? "Hello, World!"}
            onChange={onChange}
            {...rest}
          />
        );
      }}
    />
  );
};

FormFieldEditor.displayName = "FormFieldInput";

export default FormFieldEditor;
