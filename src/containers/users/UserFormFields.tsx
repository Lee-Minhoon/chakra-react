import { FileInput, WithFormLabel } from "@/components";
import { useBgColor } from "@/hooks";
import { toTitle } from "@/utils";
import { Box, Center, Flex, Icon, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { FieldPath, UseFormRegister } from "react-hook-form";
import { PiPlusThin } from "react-icons/pi";

interface UserFormFieldsProps<T extends object> {
  fields: FieldPath<T>[];
  register: UseFormRegister<T>;
  profilePreview: string;
  onProfileChange: (file: File) => void;
}

const UserFormFields = <T extends object>({
  fields,
  register,
  profilePreview,
  onProfileChange,
}: UserFormFieldsProps<T>) => {
  const bgColor = useBgColor();
  const inputRef = useRef<HTMLInputElement>(null);

  const wrapperProps = useMemo(
    () =>
      ({
        position: "relative",
        overflow: "hidden",
        width: 40,
        height: 40,
        bgColor: bgColor,
        borderRadius: "full",
        cursor: "pointer",
        _hover: { opacity: 0.5 },
        onClick: () => inputRef.current?.click(),
      }) as const,
    [bgColor]
  );

  return (
    <Flex direction={"column"} gap={4}>
      <WithFormLabel label={"Profile"}>
        <FileInput ref={inputRef} onChange={onProfileChange} />
        <Center>
          {profilePreview ? (
            <Box {...wrapperProps}>
              <Image
                fill
                sizes={"100%"}
                src={profilePreview}
                alt={"profile"}
                style={{ objectFit: "cover" }}
              />
            </Box>
          ) : (
            <Center {...wrapperProps}>
              <Icon as={PiPlusThin} w={12} h={12} />
            </Center>
          )}
        </Center>
      </WithFormLabel>
      {fields.map((field) => (
        <WithFormLabel key={field.toString()} label={toTitle(field.toString())}>
          <Input {...register(field)} placeholder={toTitle(field.toString())} />
        </WithFormLabel>
      ))}
    </Flex>
  );
};

export default UserFormFields;
