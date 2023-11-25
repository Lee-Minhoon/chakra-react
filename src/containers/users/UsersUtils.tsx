import { useCreateTestUsers, useCreateUser, useResetTestUsers } from "@/apis";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import { TbPlus } from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";

const count = 50;

const randomString = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let str = "";
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

const randomPhone = () => {
  const chars = "0123456789";
  let str = "010-";
  for (let i = 0; i < 4; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  str += "-";
  for (let i = 0; i < 4; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
};

interface UsersUtilsProps {
  onCreateUser: () => void;
}

const UsersUtils = ({ onCreateUser }: UsersUtilsProps) => {
  const { mutate: postUser } = useCreateUser();
  const { mutate: createTestUsers, isLoading: createTestUsersLoading } =
    useCreateTestUsers(count);
  const { mutate: resetTestUsers, isLoading: restTestUsersLoading } =
    useResetTestUsers();

  return (
    <Flex gap={4}>
      <Tooltip hasArrow label={"Create User"}>
        <Button leftIcon={<TbPlus />} onClick={onCreateUser}>
          User
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Create Random User"}>
        <Button
          leftIcon={<TbPlus />}
          onClick={() =>
            postUser({
              name: randomString(10),
              email: `${randomString(20)}@gmail.com`,
              phone: randomPhone(),
            })
          }
        >
          Random User
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Create 50 Users for Test"}>
        <Button
          leftIcon={<TbPlus />}
          onClick={() => createTestUsers({})}
          isDisabled={createTestUsersLoading}
        >
          {`${count} Users`}
        </Button>
      </Tooltip>
      <Tooltip hasArrow label={"Reset All Users"}>
        <Button
          leftIcon={<GrPowerReset />}
          onClick={() => resetTestUsers({})}
          isDisabled={restTestUsersLoading}
        >
          Users
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default UsersUtils;
