import { User, useCreateUser } from "@/apis";
import { useUpload } from "@/apis/upload";
import { FileInput, WithLabel } from "@/components";
import { useBgColor } from "@/hooks";
import {
  Box,
  Button,
  Center,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PiPlusThin } from "react-icons/pi";
interface UserCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserCreateModal = ({ isOpen, onClose }: UserCreateModalProps) => {
  const { register, handleSubmit } = useForm<User>();
  const { mutate: postUser, isSuccess } = useCreateUser();
  const bgColor = useBgColor();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState("");
  const { mutateAsync: upload } = useUpload();

  useEffect(() => {
    if (!isSuccess) return;
    onClose();
  }, [isSuccess, onClose]);

  const wrapperProps = useMemo(
    () =>
      ({
        position: "relative",
        overflow: "hidden",
        width: 40,
        height: 40,
        bgColor: bgColor,
        borderRadius: "full",
        cursor: "pointer",
        _hover: { opacity: 0.5 },
        onClick: () => inputRef.current?.click(),
      }) as const,
    [bgColor]
  );

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

              upload(formData)
                .then((res) => {
                  data.profile =
                    res.data["file"][0].filepath.split("public")[1];
                  postUser(data);
                })
                .catch((err) => err);
            },
            [file, postUser, upload]
          )
        )}
      >
        <ModalHeader>Create User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} gap={4}>
            <WithLabel label={"Profile"}>
              <FileInput
                ref={inputRef}
                onChange={(file) => {
                  setFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
              <Center>
                {preview ? (
                  <Box {...wrapperProps}>
                    <Image
                      fill
                      src={preview}
                      alt={"profile"}
                      style={{ objectFit: "cover" }}
                    />
                  </Box>
                ) : (
                  <Center {...wrapperProps}>
                    <Icon as={PiPlusThin} w={12} h={12} />
                  </Center>
                )}
              </Center>
            </WithLabel>
            <WithLabel label={"Name"}>
              <Input {...register("name")} placeholder="name" required />
            </WithLabel>
            <WithLabel label={"Email"}>
              <Input {...register("email")} placeholder="email" required />
            </WithLabel>
            <WithLabel label={"Phone"}>
              <Input {...register("phone")} placeholder="phone" required />
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
