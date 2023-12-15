import { User } from "@/apis";
import { useBgColor } from "@/hooks";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Heading,
  Icon,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useMemo } from "react";

interface UserCardProps {
  user?: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const bgColor = useBgColor();

  const attributes = useMemo(
    () => [
      { label: "Approved", value: user?.approved ? "Yes" : "No" },
      { label: "Email", value: user?.email },
      { label: "Phone", value: user?.phone },
    ],
    [user]
  );

  return (
    <Card direction={"row"}>
      <Box p={5}>
        <Box
          pos={"relative"}
          overflow={"hidden"}
          w={40}
          h={40}
          bgColor={bgColor}
          borderRadius={"full"}
        >
          {user?.profile && (
            <Image
              fill
              src={user.profile}
              alt={"profile"}
              style={{ objectFit: "cover" }}
            />
          )}
        </Box>
      </Box>
      <Flex flex={1} direction={"column"}>
        <CardHeader>
          <Heading size={"lg"}>{user?.name}</Heading>
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

export default UserCard;
