import Stack from "@/components/common/Stack";
import Button from "@/components/common/ui/Button";

const Navbar = () => {
  return (
    <div className="flex justify-between p-8 border-b border-neutral-20">
      <span>Logo</span>
      <Stack direction="row" gap={6}>
        <Button width="fit">Cadastre-se</Button>
        <Button width="fit">Entrar</Button>
      </Stack>
    </div>
  );
};

export default Navbar;
