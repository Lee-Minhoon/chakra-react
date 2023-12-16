import { useBgColor } from "@/hooks";
import { Box } from "@chakra-ui/react";
import Image from "next/image";

interface ProfileProps {
  profile?: string;
}

const Profile = ({ profile }: ProfileProps) => {
  const bgColor = useBgColor();

  return (
    <Box
      pos={"relative"}
      overflow={"hidden"}
      w={10}
      h={10}
      bgColor={bgColor}
      borderRadius={"full"}
    >
      {profile && (
        <Image
          fill
          sizes={"100%"}
          src={profile}
          alt={"profile"}
          style={{ objectFit: "cover" }}
        />
      )}
    </Box>
  );
};

export default Profile;
