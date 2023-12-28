import { useCreateTestPosts, useCreateUser, useResetTestPosts } from "@/apis";
import { useModalStore } from "@/stores";
import { getRandomPhoneNumber, getRandomString } from "@/utils";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { GrPowerReset } from "react-icons/gr";
import { TbPlus } from "react-icons/tb";
import { UserCreateModal } from ".";

const count = 50;

const UsersUtils = () => {
  const { openModal } = useModalStore(["openModal"]);
  const { mutate: createUser } = useCreateUser();
  const { mutate: createTestUsers, isLoading: createTestUsersIsLoading } =
    useCreateTestPosts(count);
  const { mutate: resetTestUsers, isLoading: restTestUsersIsLoading } =
    useResetTestPosts();

  const handleCreateUser = useCallback(() => {
    openModal(UserCreateModal, {});
  }, [openModal]);

  const handleCreateRandomUser = useCallback(() => {
    createUser({
      name: getRandomString(10),
      email: `${getRandomString(20)}@gmail.com`,
      phone: getRandomPhoneNumber(),
    });
  }, [createUser]);

  const handleCreateTestUsers = useCallback(() => {
    createTestUsers();
  }, [createTestUsers]);

  const handleResetTestUsers = useCallback(() => {
    resetTestUsers();
  }, [resetTestUsers]);

  return (
    <Flex gap={4}>
      <Tooltip hasArrow label={"Create User"}>
        <Button leftIcon={<TbPlus />} onClick={handleCreateUser}>
          User
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Create Random User"}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateRandomUser}
        >
          Random User
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Create 50 Users for Test"}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateTestUsers}
          isDisabled={createTestUsersIsLoading}
        >
          {`${count} Users`}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Reset All Users"}>
        <Button
          variant={"outline"}
          leftIcon={<GrPowerReset />}
          onClick={handleResetTestUsers}
          isDisabled={restTestUsersIsLoading}
        >
          Users
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default UsersUtils;
