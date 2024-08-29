import { FileInput, WithFormLabel } from "@/components";
import { useAlphaColor } from "@/hooks";
import { Box, Center, Icon, Image } from "@chakra-ui/react";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { PiPlusThin } from "react-icons/pi";

interface UserProfileInputProps {
  preview: string;
  onChange: (file: File) => void;
}

const UserProfileInput = ({ preview, onChange }: UserProfileInputProps) => {
  const alphaColor = useAlphaColor();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const wrapperProps = useMemo(
    () =>
      ({
        position: "relative",
        overflow: "hidden",
        width: 40,
        height: 40,
        bgColor: alphaColor(50),
        borderRadius: "full",
        cursor: "pointer",
        _hover: { opacity: 0.5 },
        onClick: () => inputRef.current?.click(),
      }) as const,
    [alphaColor]
  );

  return (
    <WithFormLabel label={t("Profile")}>
      <FileInput ref={inputRef} onChange={onChange} />
      <Center>
        {preview ? (
          <Box {...wrapperProps}>
            <Image
              // fill
              sizes={"100%"}
              src={preview}
              alt={"profile"}
              style={{ objectFit: "cover" }}
            />
          </Box>
        ) : (
          <Center {...wrapperProps}>
            <Icon as={PiPlusThin} w={"12"} h={"12"} />
          </Center>
        )}
      </Center>
    </WithFormLabel>
  );
};

export default UserProfileInput;
