import { useGetMe, useSignout } from "@/apis/auth";
import { PageRoutes } from "@/constants";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  Center,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";

const HorizontalLayoutSidebarFooter = () => {
  const { push } = useSafePush();
  const { data: me } = useGetMe();
  const { mutate: signout } = useSignout();
  const { t } = useTranslation();

  return (
    <Center as={"footer"} mt={"auto"} gap={"4"} py={"4"}>
      {me ? (
        <Flex gap={"4"} align={"center"} overflow={"hidden"}>
          <Text
            display={{ base: "none", xl: "block" }}
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {`${t("Welcome")} `}
            <Text as={"b"} color={"primary.500"}>
              {me?.name}
            </Text>
          </Text>
          <Tooltip hasArrow label={t("Sign Out")}>
            <IconButton aria-label="signout" onClick={() => signout()}>
              <Icon as={RiLogoutBoxRLine} />
            </IconButton>
          </Tooltip>
        </Flex>
      ) : (
        <>
          <Text display={{ base: "none", xl: "block" }}>
            {t("Not Signed In")}
          </Text>
          <Tooltip hasArrow label={t("Sign In")}>
            <IconButton
              aria-label="signin"
              onClick={() => push(toUrl(PageRoutes.Signin))}
            >
              <Icon as={RiLoginBoxLine} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Center>
  );
};

export default HorizontalLayoutSidebarFooter;
