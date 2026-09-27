import { ComponentProps } from "react";
import { Select } from "antd";

type SelectProps = ComponentProps<typeof Select>;

export interface SelectFieldProps extends SelectProps {
  /** Control width (number of px or any CSS width). */
  width?: number | string;
}

const SelectField = ({
  width = 170,
  className,
  style,
  allowClear = true,
  ...props
}: SelectFieldProps) => (
  <Select
    className={["app-select", className].filter(Boolean).join(" ")}
    style={{ width, ...style }}
    allowClear={allowClear}
    {...props}
  />
);

export default SelectField;
