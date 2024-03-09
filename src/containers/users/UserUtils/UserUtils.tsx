import { useCreateTestUsers, useCreateUser, useResetTestUsers } from "@/apis";
import { ApiRoutes, styles } from "@/constants";
import { useQueryKeyParams } from "@/hooks";
import { useModalStore } from "@/stores";
import { getRandomPhoneNumber, getRandomString, toUrl } from "@/utils";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GrPowerReset } from "react-icons/gr";
import { TbPlus } from "react-icons/tb";
import { UserCreateModal } from "../UserModal";

const count = 100;

const UsersUtils = () => {
  const { openModal } = useModalStore(["openModal"]);
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.User));
  const { mutate: createUser, isLoading: createUserIsLoading } =
    useCreateUser(queryKeyParams);
  const { mutate: createTestUsers, isLoading: createTestUsersIsLoading } =
    useCreateTestUsers(count);
  const { mutate: resetTestUsers, isLoading: resetTestUsersIsLoading } =
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
    <Flex gap={"4"} wrap={"wrap"}>
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
          isLoading={createUserIsLoading}
          isDisabled={createUserIsLoading}
        >
          {t("Random User")}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={t("Create Users for Test", { count })}>
        <Button
          variant={"outline"}
          leftIcon={<TbPlus />}
          onClick={handleCreateTestUsers}
          isLoading={createTestUsersIsLoading}
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
          isLoading={resetTestUsersIsLoading}
          isDisabled={resetTestUsersIsLoading}
        >
          {t("Users")}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default UsersUtils;
