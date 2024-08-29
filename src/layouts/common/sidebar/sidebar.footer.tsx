import { useGetMe, useSignout } from "@/apis";
import { PageRoutes, styles } from "@/constants";
import { useRoute } from "@/hooks";
import { toPath } from "@/utils";
import {
  Center,
  Flex,
  Icon,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";

const SidebarFooter = () => {
  const { t } = useTranslation();
  const signout = useSignout();
  const { route } = useRoute();
  const { data: me } = useGetMe();

  const handleClickSignin = useCallback(() => {
    route({ pathname: toPath(PageRoutes.Signin) });
  }, [route]);

  return (
    <Center as={"footer"} mt={"auto"} gap={"4"} py={"4"}>
      {me ? (
        <Flex gap={"4"} align={"center"} overflow={"hidden"}>
          <Text
            display={{ base: "block", lg: "none", xl: "block" }}
            {...styles.ellipsis}
          >
            {`${t("Welcome")} `}
            <Text as={"b"} color={"primary.500"}>
              {me?.name}
            </Text>
          </Text>
          <Tooltip hasArrow label={t("Sign Out")}>
            <IconButton aria-label="signout" onClick={signout}>
              <Icon as={RiLogoutBoxRLine} />
            </IconButton>
          </Tooltip>
        </Flex>
      ) : (
        <>
          <Text display={{ base: "block", lg: "none", xl: "block" }}>
            {t("Not Signed In")}
          </Text>
          <Tooltip hasArrow label={t("Sign In")}>
            <IconButton aria-label="signin" onClick={handleClickSignin}>
              <Icon as={RiLoginBoxLine} />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Center>
  );
};

export default SidebarFooter;
