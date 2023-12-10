import { User, useCreateUser } from "@/apis";
import { WithLabel } from "@/components";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserCreateModal = ({ isOpen, onClose }: UserCreateModalProps) => {
  const { register, handleSubmit } = useForm<User>();
  const { mutate: postUser, isSuccess } = useCreateUser();

  useEffect(() => {
    if (!isSuccess) return;
    onClose();
  }, [isSuccess, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={"form"}
        onSubmit={handleSubmit(
          useCallback((data) => postUser(data), [postUser])
        )}
      >
        <ModalHeader>Create User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} gap={4}>
            <WithLabel label={"Name"}>
              <Input {...register("name")} placeholder="name" />
            </WithLabel>
            <WithLabel label={"Email"}>
              <Input {...register("email")} placeholder="email" />
            </WithLabel>
            <WithLabel label={"Phone"}>
              <Input {...register("phone")} placeholder="phone" />
            </WithLabel>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" type={"submit"}>
            Create Uesr
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserCreateModal;
