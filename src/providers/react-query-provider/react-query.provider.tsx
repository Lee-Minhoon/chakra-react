import { ApiError, isApiResponse } from "@/apis";
import { modalStore } from "@/stores";
import { createStandaloneToast } from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { isAxiosError } from "axios";

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
      if (!isAxiosError<ApiError>(error) || query.meta?.ignoreError) return;
      modalStore.getState().openAlert({
        title: "Error",
        content: error.response?.data.message || error.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, _variables, _context, mutation) => {
      if (!isApiResponse(data) || mutation.meta?.ignoreSuccess) return;
      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error, _variables, _context, mutation) => {
      if (!isAxiosError<ApiError>(error) || mutation.meta?.ignoreError) return;
      toast({
        title: "Failed",
        description: error.response?.data.message || error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  }),
});

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
