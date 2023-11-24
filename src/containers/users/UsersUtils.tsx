import { useCreateTestUsers, useCreateUser, useResetTestUsers } from "@/apis";
import { Button, Flex } from "@chakra-ui/react";

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
      <Button flex={1} onClick={onCreateUser}>
        Create User
      </Button>
      <Button
        flex={1}
        onClick={() =>
          postUser({
            name: randomString(10),
            email: `${randomString(20)}@gmail.com`,
            phone: randomPhone(),
          })
        }
      >
        Create Random User
      </Button>
      <Button
        flex={1}
        onClick={() => createTestUsers({})}
        isDisabled={createTestUsersLoading}
      >
        {`Create ${count} Users`}
      </Button>
      <Button
        flex={1}
        onClick={() => resetTestUsers({})}
        isDisabled={restTestUsersLoading}
      >
        {`Reset Users`}
      </Button>
    </Flex>
  );
};

export default UsersUtils;
