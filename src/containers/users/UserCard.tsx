import { User } from "@/apis";
import { useBgColor } from "@/hooks";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useMemo } from "react";
import { TbEdit } from "react-icons/tb";
import UserUpdateModal from "./UserUpdateModal";

interface UserCardProps {
  user?: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <>
      {user && (
        <UserUpdateModal user={user} isOpen={isOpen} onClose={onClose} />
      )}
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
                priority
                fill
                sizes={"100%"}
                src={user.profile}
                alt={"profile"}
                style={{ objectFit: "cover" }}
              />
            )}
          </Box>
        </Box>
        <Flex flex={1} direction={"column"}>
          <CardHeader>
            <Flex justify={"space-between"}>
              <Heading size={"lg"}>{user?.name}</Heading>
              <Button size={"sm"} rightIcon={<TbEdit />} onClick={onOpen}>
                Edit
              </Button>
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
    </>
  );
};

export default UserCard;
