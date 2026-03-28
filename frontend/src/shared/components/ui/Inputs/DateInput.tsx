import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from "date-fns/locale";

const DateInput = ({
  placeholder,
  selectedDate,
  onChange,
  error,
  showErrorMsg,
}: {
  placeholder?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  error?: string;
  showErrorMsg?: boolean;
}) => {
  const errorClasses = clsx("block text-error-1 text-sm mt-0.5");
  const hasError = Boolean(error);

  return (
    <div className="relative flex gap-0.5 flex-col w-full">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        locale={ptBR}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder || "Insira a data"}
        className={clsx(
          "w-full px-4 py-3 rounded-lg outline-none transition-all duration-200",
          "text-neutral-80 placeholder:text-neutral-40 bg-white",
          hasError
            ? "border border-error-1 focus:border-error-1 animate-shake"
            : "border border-[#D1D0D0] focus:border-gray-400",
        )}
      />
      {error && showErrorMsg && <span className={errorClasses}>{error}</span>}
    </div>
  );
};

export default DateInput;
