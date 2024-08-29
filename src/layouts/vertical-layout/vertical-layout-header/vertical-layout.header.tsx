import { useGetMe, useSignout } from "@/apis";
import {
  ColorToggler,
  LanguageToggler,
  LayoutToggler,
  Logo,
  PrimaryColorChanger,
} from "@/components";
import { PageRoutes } from "@/constants";
import { useRoute } from "@/hooks";
import { toPath } from "@/utils";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import VerticalLayoutNav from "./vertical-layout.nav";

const VerticalLayoutHeader = () => {
  const { t } = useTranslation();
  const { route } = useRoute();
  const { data: me } = useGetMe();
  const signout = useSignout();

  return (
    <Box
      as={"header"}
      display={"flex"}
      flexDirection={"column"}
      gap={"4"}
      mb={"4"}
      pt={"10"}
      w={{ base: "100%", xl: "container.xl" }}
    >
      <Flex justify={"flex-end"} gap={"4"} px={{ base: "4", xl: "0" }}>
        <LayoutToggler />
        <ColorToggler />
        <PrimaryColorChanger />
        <LanguageToggler />
        {me ? (
          <Button rightIcon={<RiLogoutBoxRLine />} onClick={signout}>
            {t("Sign Out")}
          </Button>
        ) : (
          <Button
            rightIcon={<RiLoginBoxLine />}
            onClick={() => {
              route({ pathname: toPath(PageRoutes.Signin) });
            }}
          >
            {t("Sign In")}
          </Button>
        )}
      </Flex>
      {me && (
        <Flex justify={"flex-end"} px={{ base: "4", xl: "0" }}>
          <Text>
            {`${t("Welcome")} `}
            <Text as={"b"} color={"primary.500"}>
              {me?.name}
            </Text>
          </Text>
        </Flex>
      )}
      <Box p={"12"}>
        <Logo
          onClick={() => {
            route({ pathname: toPath(PageRoutes.Home) });
          }}
        />
      </Box>
      <VerticalLayoutNav />
    </Box>
  );
};

export default VerticalLayoutHeader;
