import { useModalStore } from "@/stores";
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
import { useTranslation } from "react-i18next";

const Alert = () => {
  const { alert, closeAlert } = useModalStore(["alert", "closeAlert"]);
  const { t } = useTranslation();

  return (
    <Modal isOpen={!!alert} onClose={closeAlert}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{alert?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{alert?.content}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeAlert}>
            {t("Confirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Alert;
