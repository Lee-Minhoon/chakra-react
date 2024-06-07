import { FormField } from "@/components";
import { capitalize } from "lodash-es";
import { FieldPath, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface UserFormFieldsProps<T extends object> {
  fields: FieldPath<T>[];
  register: UseFormRegister<T>;
}

const UserFormFields = <T extends object>({
  fields,
  register,
}: UserFormFieldsProps<T>) => {
  const { t } = useTranslation();

  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field}
          label={t(capitalize(field))}
          isRequired
          fieldType={"string"}
          {...register(field)}
        />
      ))}
    </>
  );
};

export default UserFormFields;
