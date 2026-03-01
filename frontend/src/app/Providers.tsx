import AuthProvider from "@/features/auth/hooks/useAuth";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
