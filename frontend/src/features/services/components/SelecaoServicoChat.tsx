import Button from "@/shared/components/ui/buttons/Button";
import ProfilePhoto from "@/shared/components/ui/ProfilePhoto";

export const SelecaoServicoChat = ({
  destinatario,
  onClick,
}: {
  destinatario: string;
  onClick: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      icon={<ProfilePhoto photoPath="" className="w-auto!" size="xs" />}
    >
      <div className="flex items-center w-full justify-start">
        {destinatario}
      </div>
    </Button>
  );
};
