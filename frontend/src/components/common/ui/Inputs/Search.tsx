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
          "rounded bg-white",
          "border-2 border-white/20",
          "focus:outline-none",
          "text-gray-800 placeholder:text-gray-600",
          "transition-all duration-200",
          "focus:outline-none focus:ring ring-black/30 focus:border-black/40",
          "shadow-sm focus:shadow-md",
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
          "transition-colors duration-200",
          "group-focus-within:text-gray-700",
        )}
      >
        <SearchIcon />
      </span>
    </div>
  );
};

export default Search;
