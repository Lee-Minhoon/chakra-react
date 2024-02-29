import { User } from "@/apis";
import { PageRoutes } from "@/constants";
import { useBgColor, useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface UserListItemProps {
  data: User;
}

const UserListItem = ({ data: user }: UserListItemProps) => {
  const bgColor = useBgColor();
  const { push } = useSafePush();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    push(toUrl(PageRoutes.UserDetail, { id: user.id }));
  }, [push, user]);

  const attributes = useMemo(
    () => [
      { label: t("Approval Status"), value: user.approved ? "Yes" : "No" },
      { label: t("Email"), value: user.email },
      { label: t("Phone"), value: user.phone },
    ],
    [t, user.approved, user.email, user.phone]
  );

  return (
    <Card
      direction={"row"}
      onClick={handleClick}
      cursor={"pointer"}
      _hover={{ backgroundColor: bgColor(50) }}
    >
      <Flex flex={1} direction={"column"}>
        <CardHeader>
          <Flex gap={4}>
            <Avatar name={user.name} src={user.profile} w={10} h={10} />
            <Heading size={"lg"}>{user.name}</Heading>
          </Flex>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {attributes.map((attribute) => (
              <Box key={attribute.label}>
                <Heading size="xs" textTransform="uppercase">
                  {attribute.label}
                </Heading>
                <Text pt="2" fontSize="sm">
                  {attribute.value}
                </Text>
              </Box>
            ))}
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default UserListItem;
