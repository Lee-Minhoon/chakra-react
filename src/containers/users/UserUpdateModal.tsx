import { User, useUpdateUser } from "@/apis";
import { useUpload } from "@/apis/upload";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserFormFields from "./UserFormFields";

interface UserUpdateModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserUpdateModal = ({ user, isOpen, onClose }: UserUpdateModalProps) => {
  const { register, handleSubmit, setValue, reset } = useForm<User>({
    defaultValues: user,
  });
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: upload } = useUpload();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(user.profile ?? "");

  useEffect(() => {
    if (isOpen && user.profile) {
      setPreview(user.profile);
    }
  }, [isOpen, user.profile]);

  useEffect(() => {
    if (!isOpen) {
      reset();
      setFile(undefined);
      setPreview("");
    }
  }, [isOpen, reset, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={"form"}
        onSubmit={handleSubmit(
          useCallback(
            (data) => {
              if (file) {
                const formData = new FormData();
                formData.append("file", file);

                upload(formData, {
                  onSuccess: (res) => {
                    data.profile =
                      res.data["file"][0].filepath.split("public")[1];
                    updateUser(data, { onSuccess: onClose });
                  },
                });
              } else {
                updateUser(data, { onSuccess: onClose });
              }
            },
            [file, onClose, updateUser, upload]
          )
        )}
      >
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UserFormFields
            register={register}
            profilePreview={preview}
            onProfileChange={(file) => {
              setFile(file);
              setPreview(URL.createObjectURL(file));
            }}
          />
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
