import { ComponentProps } from "react";
import { Input } from "antd";
import { FiSearch } from "react-icons/fi";

type InputProps = ComponentProps<typeof Input>;

export interface SearchInputProps extends InputProps {
  /** Control width (number of px or any CSS width). */
  width?: number | string;
}

const SearchInput = ({
  width,
  className,
  style,
  placeholder = "Search",
  ...props
}: SearchInputProps) => (
  <Input
    className={["app-search-input", className].filter(Boolean).join(" ")}
    prefix={<FiSearch />}
    placeholder={placeholder}
    allowClear
    style={width ? { width, ...style } : style}
    {...props}
  />
);

export default SearchInput;
