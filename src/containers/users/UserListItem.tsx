import { User } from "@/apis";
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
import { useMemo } from "react";

interface UserListItemProps {
  data: User;
}

const UserListItem = ({ data: user }: UserListItemProps) => {
  const attributes = useMemo(
    () => [
      { label: "Approved", value: user.approved ? "Yes" : "No" },
      { label: "Email", value: user.email },
      { label: "Phone", value: user.phone },
    ],
    [user]
  );

  return (
    <Card direction={"row"}>
      <Flex flex={1} direction={"column"}>
        <CardHeader>
          <Flex gap={4}>
            <Avatar src={user.profile} w={10} h={10} />
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
