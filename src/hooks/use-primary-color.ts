import { PrimaryColor } from "@/types";
import { createContext, useContext } from "react";

const PrimaryColorContext = createContext<{
  primaryColor: PrimaryColor;
  changePrimaryColor: (color: PrimaryColor) => void;
}>({
  primaryColor: "teal",
  changePrimaryColor: () => {},
});

const usePrimaryColor = () => {
  const { primaryColor, changePrimaryColor } = useContext(PrimaryColorContext);

  return {
    Provider: PrimaryColorContext.Provider,
    primaryColor,
    changePrimaryColor,
  };
};

export default usePrimaryColor;
