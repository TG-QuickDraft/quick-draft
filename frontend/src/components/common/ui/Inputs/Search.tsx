import clsx from "clsx";
import SearchIcon from "@/assets/icons/ui/actions/search-icon.svg?react";

const widths = {
  full: "w-full",
  auto: "w-auto",
  fit: "w-fit",
  fixed: "w-[350px]",
};

type SearchProps = {
  placeholder?: string;
  onChange?: (e: any) => void;
  width?: keyof typeof widths;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
};

const Search = ({
  placeholder,
  onChange,
  onKeyPress,
  width = "auto",
  className,
  ...props
}: SearchProps) => {
  return (
    <div className={clsx("relative group", widths[width])}>
      <input
        onChange={onChange}
        onKeyDown={onKeyPress}
        className={clsx(
          "py-1.5 pl-3 pr-12",
          "rounded-lg bg-white",
          "border-2 border-white/20",
          "focus:outline-none",
          "text-gray-800 placeholder:text-gray-600",
          "transition-all duration-200",
          "transform",
          "shadow-sm focus:shadow-lg focus:scale-102",
          widths[width],
          className,
        )}
        type="text"
        placeholder={placeholder}
        {...props}
      />
      <span
        className={clsx(
          "absolute right-4 top-1/2 -translate-y-1/2",
          "text-gray-400 pointer-events-none",
          "transition-all duration-200",
          "group-focus-within:text-gray-700",
          "group-focus-within:scale-110",
        )}
      >
        <SearchIcon />
      </span>
    </div>
  );
};

export default Search;
