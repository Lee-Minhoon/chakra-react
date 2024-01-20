import FormField from "@/components/common/FormField";
import { capitalize } from "lodash-es";
import { FieldPath, UseFormRegister } from "react-hook-form";

interface UserFormFieldsProps<T extends object> {
  fields: FieldPath<T>[];
  register: UseFormRegister<T>;
}

const UserFormFields = <T extends object>({
  fields,
  register,
}: UserFormFieldsProps<T>) => {
  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field}
          label={capitalize(field)}
          isRequired
          fieldType={"string"}
          {...register(field)}
        />
      ))}
    </>
  );
};

export default UserFormFields;
