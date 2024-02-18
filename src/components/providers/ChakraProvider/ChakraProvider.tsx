import {
  ChakraProvider as _ChakraProvider,
  createStandaloneToast,
} from "@chakra-ui/react";
import theme from "./theme";

interface ChakraProviderProps {
  children: React.ReactNode;
}

const { ToastContainer } = createStandaloneToast();

const ChakraProvider = ({ children }: ChakraProviderProps) => {
  return (
    <_ChakraProvider theme={theme}>
      <ToastContainer />
      {children}
    </_ChakraProvider>
  );
};

export default ChakraProvider;
