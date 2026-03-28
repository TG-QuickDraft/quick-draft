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
        className="w-full px-4 py-4 border border-neutral-60/20 rounded-lg outline-none text-neutral-80 placeholder-[#A2A2A2]"
      />
    </div>
  );
};

export default DateInput;
