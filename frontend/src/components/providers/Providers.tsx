import AuthProvider from "@/hooks/useAuth";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default Providers;
