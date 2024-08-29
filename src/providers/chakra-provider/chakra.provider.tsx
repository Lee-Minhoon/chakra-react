import { usePrimaryColor } from "@/hooks";
import { PrimaryColor } from "@/types";
import {
  ChakraProvider as _ChakraProvider,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import getTheme from "./theme";

interface ChakraProviderProps {
  children: React.ReactNode;
}

const { ToastContainer } = createStandaloneToast();

const getInitialPrimaryColor = () => {
  return (localStorage.getItem("primaryColor") as PrimaryColor) || "teal";
};

const ChakraProvider = ({ children }: ChakraProviderProps) => {
  const { Provider } = usePrimaryColor();
  const [primaryColor, setPrimaryColor] = useState(getInitialPrimaryColor);

  const changePrimaryColor = useCallback<(primaryColor: PrimaryColor) => void>(
    (primaryColor) => {
      localStorage.setItem("primaryColor", primaryColor);
      setPrimaryColor(primaryColor);
    },
    []
  );

  return (
    // https://github.com/chakra-ui/chakra-ui-docs/issues/1586
    <Provider value={{ primaryColor, changePrimaryColor }}>
      <_ChakraProvider theme={getTheme(primaryColor)} cssVarsRoot="body">
        <ToastContainer />
        {children}
      </_ChakraProvider>
    </Provider>
  );
};

export default ChakraProvider;
