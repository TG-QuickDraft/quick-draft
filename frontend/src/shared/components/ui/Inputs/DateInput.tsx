import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({
  placeholder,
  selectedDate,
  onChange,
}: {
  placeholder?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}) => {
  return (
    <div className="flex flex-col w-full">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder || "Insira a data"}
        className={clsx(
          "w-full px-4 py-3 border border-[#D1D0D0] rounded-lg outline-none ",
          "text-neutral-80 placeholder:text-neutral-40 bg-white",
        )}
      />
    </div>
  );
};

export default DateInput;
