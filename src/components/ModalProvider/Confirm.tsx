import { useModalStore } from "@/stores";
import { Modal } from "@chakra-ui/react";

const Confirm = () => {
  const { confirm, closeConfirm } = useModalStore(["confirm", "closeConfirm"]);
  return (
    <Modal isOpen={!!confirm} onClose={closeConfirm}>
      Confirm
    </Modal>
  );
};

export default Confirm;
