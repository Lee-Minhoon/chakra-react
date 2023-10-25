import { useModalStore } from "@/stores";
import { Modal } from "@chakra-ui/react";

const Alert = () => {
  const { alert, closeAlert } = useModalStore(["alert", "closeAlert"]);
  return (
    <Modal isOpen={!!alert} onClose={closeAlert}>
      Alert
    </Modal>
  );
};

export default Alert;
