import { ComponentProps } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

type RangePickerProps = ComponentProps<typeof RangePicker>;

const DateRangePicker = ({
  placeholder = ["Start date", "End date"],
  format = "MMM D, YYYY",
  allowClear = true,
  ...props
}: RangePickerProps) => (
  <RangePicker
    className="app-date-range"
    format={format}
    allowClear={allowClear}
    placeholder={placeholder}
    {...props}
  />
);

export default DateRangePicker;
