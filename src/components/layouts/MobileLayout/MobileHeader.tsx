import { Logo } from "@/components";
import { PageRoutes } from "@/constants";
import { useAlphaColor, useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";

interface MobileHeaderProps {
  onClick?: () => void;
}

const MobileHeader = ({ onClick }: MobileHeaderProps) => {
  const { push } = useSafePush();
  const alphaColor = useAlphaColor();

  return (
    <Flex
      as={"header"}
      pos={"sticky"}
      align={"center"}
      bgColor={alphaColor(50)}
      top={"0"}
      gap={"4"}
      p={"4"}
    >
      <IconButton
        aria-label={"Open Sidebar"}
        variant={"outline"}
        onClick={onClick}
      >
        <Icon as={GiHamburgerMenu} />
      </IconButton>
      <Logo onClick={() => push(toUrl(PageRoutes.Home))} />
    </Flex>
  );
};

export default MobileHeader;
