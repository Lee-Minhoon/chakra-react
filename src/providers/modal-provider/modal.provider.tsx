import Alert from "./alert";
import Confirm from "./confirm";
import Modals from "./modals";

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
