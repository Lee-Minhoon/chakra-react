import { ApiError, ApiResponse } from "@/apis";
import {
  Authenticator,
  ChakraProvider,
  LayoutProvider,
  ModalProvider,
  Translator,
} from "@/components";
import { modalStore } from "@/stores";
import { createStandaloneToast } from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";

const { toast } = createStandaloneToast();

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
        content: error.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      const typedData = data as ApiResponse<any>;
      if (!("message" in typedData) || mutation.meta?.ignoreSuccess) return;
      toast({
        title: "Success",
        description: typedData.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error, variables, context, mutation) => {
      if (!(error instanceof ApiError) || mutation.meta?.ignoreError) return;
      toast({
        title: "Failed",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  }),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ChakraProvider>
        <Translator>
          <Authenticator />
          <ModalProvider />
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </Translator>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
