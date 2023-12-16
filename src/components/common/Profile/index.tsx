import { useBgColor } from "@/hooks";
import { Box, BoxProps } from "@chakra-ui/react";
import Image from "next/image";

interface ProfileProps extends Pick<BoxProps, "w" | "width" | "h" | "height"> {
  profile?: string;
  priority?: boolean;
}

const Profile = ({ profile, w, width, h, height, priority }: ProfileProps) => {
  const bgColor = useBgColor();

  return (
    <Box
      pos={"relative"}
      overflow={"hidden"}
      w={w ?? width}
      h={h ?? height}
      bgColor={bgColor}
      borderRadius={"full"}
    >
      {profile && (
        <Image
          fill
          priority={priority}
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
