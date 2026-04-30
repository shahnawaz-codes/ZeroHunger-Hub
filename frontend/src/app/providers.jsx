"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry failed request
      staleTime: 1000 * 60, // cache for 1 min
      refetchOnWindowFocus: false,
    },
  },
});
export default function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
