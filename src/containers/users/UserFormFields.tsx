import { UserCreate } from "@/apis";
import { FileInput, WithLabel } from "@/components";
import { useBgColor } from "@/hooks";
import { Box, Center, Flex, Icon, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useMemo, useRef } from "react";
import { UseFormRegister } from "react-hook-form";
import { PiPlusThin } from "react-icons/pi";

interface UserFormFieldsProps {
  register: UseFormRegister<UserCreate>;
  profilePreview: string;
  onProfileChange: (file: File) => void;
}

const UserFormFields = ({
  register,
  profilePreview,
  onProfileChange,
}: UserFormFieldsProps) => {
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
      <WithLabel label={"Profile"}>
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
      </WithLabel>
      <WithLabel label={"Name"}>
        <Input {...register("name")} placeholder="Name" required />
      </WithLabel>
      <WithLabel label={"Email"}>
        <Input {...register("email")} placeholder="Email" required />
      </WithLabel>
      <WithLabel label={"Phone"}>
        <Input {...register("phone")} placeholder="Phone" required />
      </WithLabel>
    </Flex>
  );
};

export default UserFormFields;
