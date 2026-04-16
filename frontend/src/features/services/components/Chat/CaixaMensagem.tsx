import clsx from "clsx";
import { formatInTimeZone } from "date-fns-tz";
import { ptBR } from "date-fns/locale";

const CaixaMensagem = ({
  mensagem,
  isRemetente,
  time,
}: {
  mensagem: string;
  isRemetente: boolean;
  time: string;
}) => {
  const timeZone = "America/Sao_Paulo";

  return (
    <div
      className={clsx(
        "flex w-full",
        isRemetente ? "justify-end" : "justify-start",
      )}
    >
      <div
        className={clsx(
          "flex flex-col rounded-xl p-2 max-w-[70%] break-all",
          isRemetente ? "bg-secondary-100" : "bg-gray-300",
        )}
      >
        <p className={clsx(isRemetente ? "self-end" : "self-start")}>
          {mensagem}
        </p>
        <p
          className={clsx(
            "text-neutral-80",
            isRemetente ? "self-end" : "self-start",
          )}
        >
          {formatInTimeZone(time, timeZone, "HH:mm", {
            locale: ptBR,
          })}
        </p>
      </div>
    </div>
  );
};

export default CaixaMensagem;
