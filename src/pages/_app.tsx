import { Api } from "@/apis";
import {
  Authenticator,
  ChakraProvider,
  LayoutProvider,
  ModalProvider,
  ReactQueryProvider,
  Translator,
} from "@/components";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Api.init();
  }, []);

  return (
    <ReactQueryProvider>
      <ChakraProvider>
        <Translator>
          <Authenticator />
          <ModalProvider />
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </Translator>
      </ChakraProvider>
    </ReactQueryProvider>
  );
}
