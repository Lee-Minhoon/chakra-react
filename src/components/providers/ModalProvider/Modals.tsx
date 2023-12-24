import { useModalStore } from "@/stores";

const Modals = () => {
  const { modals, closeModal } = useModalStore(["modals", "closeModal"]);

  return modals.map((modal, idx) => {
    const { modal: Modal, props } = modal;

    const handleClose = () => {
      closeModal(Modal);
    };

    return <Modal key={idx} {...props} onClose={handleClose} />;
  });
};

export default Modals;
