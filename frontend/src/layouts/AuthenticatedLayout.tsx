import { Outlet } from "react-router-dom";
import Button from "@/components/common/Button";
import { CiLogout } from "react-icons/ci";
import { useAuth } from "@/hooks/useAuth";

const AuthenticatedLayout = () => {
  const { logout } = useAuth();

  return (
    <>
      <Outlet />

      <Button
        icon={<CiLogout size={20} />}
        variant="danger"
        className="fixed bottom-6 left-6"
        onClick={logout}
      >
        Sair
      </Button>
    </>
  );
};

export default AuthenticatedLayout;
