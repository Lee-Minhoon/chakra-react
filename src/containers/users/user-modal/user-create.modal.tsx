import { UserCreate, useCreateUser } from "@/apis";
import { useUpload } from "@/apis/upload";
import { FormField } from "@/components";
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
import { capitalize } from "lodash-es";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UserProfileInput from "./user-profile-input";

interface UserCreateModalProps {
  onClose: () => void;
}

const UserCreateModal = ({ onClose }: UserCreateModalProps) => {
  const { control, handleSubmit } = useForm<UserCreate>();
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
                  data.profile = res.data;
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
            <FormField
              label={t(capitalize("name"))}
              fieldType={"string"}
              control={control}
              name={"name"}
              isRequired
            />
            <FormField
              label={t(capitalize("email"))}
              fieldType={"string"}
              control={control}
              name={"email"}
              isRequired
            />
            <FormField
              label={t(capitalize("phone"))}
              fieldType={"string"}
              control={control}
              name={"phone"}
              isRequired
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
