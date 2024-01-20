import { User, UserUpdate, useUpdateUser, useUpdateUserInList } from "@/apis";
import { useUpload } from "@/apis/upload";
import { usePagination } from "@/hooks";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import UserFormFields from "./UserFormFields";
import UserProfileInput from "./UserProfileInput";

interface UserUpdateModalProps {
  user: User;
  onClose: () => void;
}

const UserUpdateModal = ({ user, onClose }: UserUpdateModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const { queryKey } = usePagination();
  const { register, handleSubmit } = useForm<UserUpdate>({
    defaultValues: user,
  });
  const { mutate: updateUser } = useUpdateUser(user.id);
  const { mutate: updateUserInList } = useUpdateUserInList(queryKey);
  const { mutate: upload } = useUpload();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(user.profile ?? "");

  const mutate = useMemo(
    () => (!queryKey ? updateUser : updateUserInList),
    [queryKey, updateUser, updateUserInList]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={"form"}
        onSubmit={handleSubmit(
          useCallback(
            (data) => {
              setIsOpen(false);
              if (file) {
                const formData = new FormData();
                formData.append("file", file);

                upload(formData, {
                  onSuccess: (res) => {
                    data.profile =
                      res.data["file"][0].filepath.split("public")[1];
                    mutate(data, { onSuccess: onClose });
                  },
                });
              } else {
                mutate(data, { onSuccess: onClose });
              }
            },
            [file, mutate, onClose, upload]
          )
        )}
      >
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} gap={4}>
            <UserProfileInput preview={preview} onChange={setFile} />
            <UserFormFields
              fields={["name", "email", "phone"]}
              register={register}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" type={"submit"}>
            Update User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserUpdateModal;
