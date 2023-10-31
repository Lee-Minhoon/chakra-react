import { User, useCreateUser } from "@/apis";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateUserModal = ({ isOpen, onClose }: CreateUserModalProps) => {
  const { register, handleSubmit } = useForm<User>();
  const { mutate: postUser, isSuccess } = useCreateUser();

  useEffect(() => {
    if (!isSuccess) return;
    onClose();
  }, [isSuccess, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as={"form"}
            direction={"column"}
            gap={4}
            onSubmit={handleSubmit(
              useCallback((data) => postUser(data), [postUser])
            )}
          >
            <Input {...register("name")} placeholder="name" />
            <Input {...register("email")} placeholder="email" />
            <Input {...register("phone")} placeholder="phone" />
            <Button type={"submit"}>Create User</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
