import { User } from "@/apis";
import { Profile } from "@/components";
import { Flex } from "@chakra-ui/react";

interface UserNameProps {
  name: User["name"];
  profile?: User["profile"];
}

const UserName = ({ name, profile }: UserNameProps) => {
  return (
    <Flex gap={4} align={"center"}>
      <Profile profile={profile} w={10} h={10} />
      {name}
    </Flex>
  );
};

export default UserName;
