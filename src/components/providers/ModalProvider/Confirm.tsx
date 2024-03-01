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
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

const Confirm = () => {
  const { confirm, closeConfirm } = useModalStore(["confirm", "closeConfirm"]);
  const { t } = useTranslation();

  const handleConfirm = useCallback(() => {
    confirm?.onConfirm && confirm.onConfirm();
    closeConfirm();
  }, [closeConfirm, confirm]);

  return (
    <Modal isOpen={!!confirm} onClose={closeConfirm}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{confirm?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{confirm?.content}</ModalBody>
        <ModalFooter>
          <Button mr={"3"} onClick={closeConfirm}>
            {t("Close")}
          </Button>
          <Button variant="ghost" onClick={handleConfirm}>
            {t("Confirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Confirm;
