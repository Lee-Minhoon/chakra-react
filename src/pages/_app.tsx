import { ApiError } from "@/apis";
import ModalProvider from "@/components/ModalProvider";
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
      staleTime: 10000,
      cacheTime: 10000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof ApiError) {
        console.log(error.status, error.message);
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof ApiError) {
        console.log(error.status, error.message);
      }
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
      <ChakraProvider theme={theme}>
        <ReactQueryDevtools />
        <ModalProvider />
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
