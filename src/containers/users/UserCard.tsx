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
  Skeleton,
  SkeletonCircle,
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
      { label: "Email", value: user?.email ?? "Email" },
      { label: "Phone", value: user?.phone ?? "Phone" },
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
          {user ? (
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
          ) : (
            <SkeletonCircle size={"40"} />
          )}
        </Box>
        <Flex flex={1} direction={"column"}>
          <CardHeader>
            <Skeleton isLoaded={!!user}>
              <Flex justify={"space-between"}>
                <Heading size={"lg"}>{user?.name ?? "Name"}</Heading>
                <Button size={"sm"} rightIcon={<TbEdit />} onClick={onOpen}>
                  Edit
                </Button>
              </Flex>
            </Skeleton>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              {attributes.map((attribute) => (
                <Skeleton key={attribute.label} isLoaded={!!user}>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      {attribute.label}
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      {attribute.value}
                    </Text>
                  </Box>
                </Skeleton>
              ))}
            </Stack>
          </CardBody>
        </Flex>
      </Card>
    </>
  );
};

export default UserCard;
