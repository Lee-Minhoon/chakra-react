import { useCreateTestUsers, useCreateUser, useResetTestUsers } from "@/apis";
import { useModalStore } from "@/stores";
import { getRandomPhoneNumber, getRandomString } from "@/utils";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GrPowerReset } from "react-icons/gr";
import { TbPlus } from "react-icons/tb";
import { UserCreateModal } from "../UserModal";

const count = 1000;

const UsersUtils = () => {
  const { openModal } = useModalStore(["openModal"]);
  const { mutate: createUser } = useCreateUser();
  const { mutate: createTestUsers, isLoading: createTestUsersIsLoading } =
    useCreateTestUsers(count);
  const { mutate: resetTestUsers, isLoading: restTestUsersIsLoading } =
    useResetTestUsers();
  const { t } = useTranslation();

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
      <Tooltip hasArrow label={t("Create User")}>
        <Button leftIcon={<TbPlus />} onClick={handleCreateUser}>
          {t("User")}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t("Create Random User")}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateRandomUser}
        >
          {t("Random User")}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t("Create Users for Test", { count })}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateTestUsers}
          isDisabled={createTestUsersIsLoading}
        >
          {`${count} ${t("Users")}`}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t("Reset All Users")}>
        <Button
          variant={"outline"}
          leftIcon={<GrPowerReset />}
          onClick={handleResetTestUsers}
          isDisabled={restTestUsersIsLoading}
        >
          {t("Users")}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default UsersUtils;
