import { ComponentProps, ComponentType, useEffect } from "react";
import { Controller, FieldValues, Path, PathValue } from "react-hook-form";

type FieldComponentType<T extends FieldValues> = ComponentType<{
  name?: ComponentProps<typeof Controller<T>>["name"];
  value?: PathValue<T, Path<T>>;
  onChange?: (...event: any[]) => void;
}>;

export type FormFieldControllerProps<T extends FieldValues> = {
  render: FieldComponentType<T>;
} & Pick<ComponentProps<typeof Controller<T>>, "control" | "name" | "rules">;

const FormFieldController = <T extends FieldValues>({
  control,
  name,
  rules,
  render: Field,
  ...rest
}: FormFieldControllerProps<T>) => {
  useEffect(() => {
    if (control && !name) {
      console.warn("name prop is required when control is provided");
    }
  }, [control, name]);

  return (
    <>
      {control && name ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { value, onChange } }) => {
            return <Field value={value} onChange={onChange} {...rest} />;
          }}
        />
      ) : (
        <Field name={name} {...rest} />
      )}
    </>
  );
};

export default FormFieldController;
