import { Center } from "@chakra-ui/react";

interface CenteredLayoutProps {
  children?: React.ReactNode;
}

const CenteredLayout = ({ children }: CenteredLayoutProps) => {
  return <Center h={"100vh"}>{children}</Center>;
};

export default CenteredLayout;
