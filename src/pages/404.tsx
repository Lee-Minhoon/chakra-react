import { Button, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Center
      flexDirection={"column"}
      w={"100vw"}
      h={"100vh"}
      gap={"8"}
      pb={"20"}
    >
      <Flex direction={"column"} gap={"2"} align={"center"}>
        <Heading>404</Heading>
        <Text fontSize={"lg"}>This page could not be found.</Text>
      </Flex>
      <Button onClick={goBack}>Go back</Button>
    </Center>
  );
};

export default NotFoundPage;
