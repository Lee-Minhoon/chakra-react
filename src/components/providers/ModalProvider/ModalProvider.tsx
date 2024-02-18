import Alert from "./Alert";
import Confirm from "./Confirm";
import Modals from "./Modals";

const ModalProvider = () => {
  return (
    <>
      <Alert />
      <Confirm />
      <Modals />
    </>
  );
};

export default ModalProvider;
