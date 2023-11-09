import { ApiError } from "@/apis";
import ModalProvider from "@/components/ModalProvider";
import { modalStore } from "@/stores";
import "@/styles/globals.css";
import {
  ChakraProvider,
  baseTheme,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (!(error instanceof ApiError) || query.meta?.ignoreError) return;
      modalStore.getState().openAlert({
        title: "Error",
        message: error.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, context, mutation) => {
      if (!(error instanceof ApiError) || mutation.meta?.ignoreError) return;
      modalStore.getState().openAlert({
        title: "Error",
        message: error.message,
      });
    },
  }),
});

const theme = extendTheme(
  {
    colors: {
      primary: baseTheme.colors.teal,
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ChakraProvider theme={theme}>
        <ModalProvider />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
