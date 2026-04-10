import AuthProvider from "@/features/auth/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "@/shared/contexts/model.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ModalProvider>{children}</ModalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
