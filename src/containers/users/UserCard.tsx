import { User } from "@/apis";
import WithLabel from "@/components/common/WithTitle";
import { useModalStore } from "@/stores";
import { formatISO } from "@/utils";
import {
  Avatar,
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
} from "@chakra-ui/react";
import { useMemo } from "react";
import { TbEdit } from "react-icons/tb";
import UserUpdateModal from "./UserUpdateModal";

interface UserCardProps {
  data?: User;
}

const UserCard = ({ data: user }: UserCardProps) => {
  const { openModal } = useModalStore(["openModal"]);

  const attributes = useMemo(
    () => [
      { label: "Approved", value: user?.approved ? "Yes" : "No" },
      { label: "Email", value: user?.email ?? "Email" },
      { label: "Phone", value: user?.phone ?? "Phone" },
      {
        label: "Created At",
        value: user?.createdAt ? formatISO(user.createdAt) : "Created At",
      },
      {
        label: "Updated At",
        value: user?.updatedAt ? formatISO(user.updatedAt) : "Updated At",
      },
    ],
    [user]
  );

  return (
    <Card direction={"row"}>
      <Box p={5}>
        <SkeletonCircle isLoaded={!!user} size={"40"}>
          <Avatar name={user?.name} src={user?.profile} w={40} h={40} />
        </SkeletonCircle>
      </Box>
      <Flex flex={1} direction={"column"}>
        <CardHeader>
          <Skeleton isLoaded={!!user}>
            <Flex justify={"space-between"}>
              <Heading size={"lg"}>{user?.name ?? "Name"}</Heading>
              <Button
                size={"sm"}
                rightIcon={<TbEdit />}
                onClick={() => {
                  if (!user) return;
                  openModal(UserUpdateModal, { user });
                }}
              >
                Edit
              </Button>
            </Flex>
          </Skeleton>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {attributes.map((attribute) => {
              return (
                <Skeleton key={attribute.label} isLoaded={!!user}>
                  <WithLabel {...attribute} />
                </Skeleton>
              );
            })}
          </Stack>
        </CardBody>
      </Flex>
    </Card>
  );
};

export default UserCard;
