import { UserCreate, useCreateUser } from "@/apis";
import { useUpload } from "@/apis/upload";
import { ApiRoutes } from "@/constants";
import { useQueryKeyParams } from "@/hooks";
import { toUrl } from "@/utils";
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
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UserFormFields from "./UserFormFields";
import UserProfileInput from "./UserProfileInput";

interface UserCreateModalProps {
  onClose: () => void;
}

const UserCreateModal = ({ onClose }: UserCreateModalProps) => {
  const { register, handleSubmit } = useForm<UserCreate>();
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.User));
  const {
    mutate: createUser,
    isLoading: createUserIsLoading,
    isSuccess: createUserIsSuccess,
  } = useCreateUser(queryKeyParams);
  const { mutate: upload, isLoading: uploadIsLoading } = useUpload();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");
  const { t } = useTranslation();

  return (
    <Modal isOpen onClose={onClose}>
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
        <ModalHeader>{t("Create User")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} gap={"4"}>
            <UserProfileInput
              preview={preview}
              onChange={(file) => {
                setFile(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            <UserFormFields
              fields={["name", "email", "phone"]}
              register={register}
            />
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button mr={"3"} onClick={onClose}>
            {t("Close")}
          </Button>
          <Button
            variant="ghost"
            type={"submit"}
            isLoading={
              uploadIsLoading || createUserIsLoading || createUserIsSuccess
            }
            isDisabled={
              uploadIsLoading || createUserIsLoading || createUserIsSuccess
            }
          >
            {t("Create User")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserCreateModal;
