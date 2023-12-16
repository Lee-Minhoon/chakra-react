import { UserCreate, useCreateUser } from "@/apis";
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

interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserCreateModal = ({ isOpen, onClose }: UserCreateModalProps) => {
  const { register, handleSubmit, reset } = useForm<UserCreate>();
  const { mutate: createUser } = useCreateUser();
  const { mutate: upload } = useUpload();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!isOpen) {
      reset();
      setFile(undefined);
      setPreview("");
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as={"form"}
        onSubmit={handleSubmit(
          useCallback(
            (data) => {
              if (!file) return;
              const formData = new FormData();
              formData.append("file", file);

              upload(formData, {
                onSuccess: (res) => {
                  data.profile =
                    res.data["file"][0].filepath.split("public")[1];
                  createUser(data, { onSuccess: onClose });
                },
              });
            },
            [file, upload, createUser, onClose]
          )
        )}
      >
        <ModalHeader>Create User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UserFormFields
            fields={["name", "email", "phone"]}
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
            Create User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserCreateModal;
