import { User, UserUpdate, useUpdateUser, useUpdateUserInList } from "@/apis";
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
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UserProfileInput from "./user-profile-input";

interface UserUpdateModalProps {
  user: User;
  onClose: () => void;
}

const UserUpdateModal = ({ user, onClose }: UserUpdateModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const queryKeyParams = useQueryKeyParams(toUrl(ApiRoutes.User));
  const { control, handleSubmit } = useForm<UserUpdate>({
    defaultValues: user,
  });
  const {
    mutate: updateUser,
    isLoading: updateUserIsLoading,
    isSuccess: updateUserIsSuccess,
  } = useUpdateUser(user.id);
  const {
    mutate: updateUserInList,
    isLoading: updateUserInListIsLoading,
    isSuccess: updateUserInListIsSuccess,
  } = useUpdateUserInList(queryKeyParams);
  const { mutate: upload, isLoading: uploadIsLoading } = useUpload();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState(user.profile ?? "");
  const { t } = useTranslation();

  const mutate = useMemo(
    () => (!queryKeyParams ? updateUser : updateUserInList),
    [queryKeyParams, updateUser, updateUserInList]
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
                    data.profile = res.data;
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
        <ModalHeader>{t("Update User")}</ModalHeader>
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
              uploadIsLoading ||
              updateUserIsLoading ||
              updateUserIsSuccess ||
              updateUserInListIsLoading ||
              updateUserInListIsSuccess
            }
            isDisabled={
              uploadIsLoading ||
              updateUserIsLoading ||
              updateUserIsSuccess ||
              updateUserInListIsLoading ||
              updateUserInListIsSuccess
            }
          >
            {t("Update User")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserUpdateModal;
