import { usePrimaryColor } from "@/hooks";
import {
  Box,
  Flex,
  Icon,
  PlacementWithLogical,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { BiSolidColor } from "react-icons/bi";
import ChangerBase from "./changer.base";

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "linkedin",
  "facebook",
  "messenger",
  "whatsapp",
  "twitter",
  "telegram",
] as const;

interface PrimaryColorChangerProps {
  placement?: PlacementWithLogical;
}

const size = "calc(((20rem - 1.5rem - 2px) - 1rem * 7) / 8)";

const PrimaryColorChanger = ({ placement }: PrimaryColorChangerProps) => {
  const { changePrimaryColor } = usePrimaryColor();
  const { t } = useTranslation();

  return (
    <Popover placement={placement}>
      <PopoverTrigger>
        <Box>
          <ChangerBase ariaLabel={"Primary color"} label={t("Primary Color")}>
            <Icon as={BiSolidColor} w={"4"} h={"4"} />
          </ChangerBase>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{t("Primary Color")}</PopoverHeader>
        <PopoverBody>
          <Flex wrap={"wrap"} gap={"4"}>
            {colors.map((color) => (
              <Tooltip key={color} hasArrow label={color}>
                <Box
                  w={size}
                  h={size}
                  bg={`${color}.500`}
                  borderRadius={"full"}
                  cursor={"pointer"}
                  _hover={{ bg: `${color}.600` }}
                  onClick={() => changePrimaryColor(color)}
                />
              </Tooltip>
            ))}
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PrimaryColorChanger;
