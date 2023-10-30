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

const Alert = () => {
  const { alert, closeAlert } = useModalStore(["alert", "closeAlert"]);

  return (
    <Modal isOpen={!!alert} onClose={closeAlert}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{alert?.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{alert?.message}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeAlert}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Alert;
