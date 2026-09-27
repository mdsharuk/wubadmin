import { ComponentProps } from "react";
import { DatePicker } from "antd";

type DatePickerProps = ComponentProps<typeof DatePicker>;

/**
 * Single date picker styled the same as the DateRangePicker
 * (same format and clear behavior).
 */
const DateField = ({
  format = "MMM D, YYYY",
  allowClear = true,
  className,
  ...props
}: DatePickerProps) => (
  <DatePicker
    className={["app-date", className].filter(Boolean).join(" ")}
    format={format}
    allowClear={allowClear}
    {...props}
  />
);

export default DateField;
