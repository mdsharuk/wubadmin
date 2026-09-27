import { ReactNode } from "react";
import { Input } from "antd";
import type { InputProps } from "antd";

export interface InputFieldProps extends InputProps {
  /** Field title/label. */
  label?: ReactNode;
  /** Marks the field as required (adds a red asterisk). */
  required?: boolean;
  /** Error message shown below the field. */
  error?: ReactNode;
  /** Helper text shown when there is no error. */
  hint?: ReactNode;
  /** Render a custom control instead of the default input. */
  control?: ReactNode;
  /** Wrapper class name. */
  fieldClassName?: string;
}

const InputField = ({
  label,
  required = false,
  error,
  hint,
  control,
  fieldClassName,
  id,
  className,
  ...inputProps
}: InputFieldProps) => (
  <div
    className={["form-item", fieldClassName ?? ""].filter(Boolean).join(" ")}
  >
    {label ? (
      <label htmlFor={id}>
        {label}
        {required ? <span className="form-item__required">*</span> : null}
      </label>
    ) : null}

    {control ?? (
      <Input
        id={id}
        className={className}
        status={error ? "error" : undefined}
        {...inputProps}
      />
    )}

    {error ? (
      <div className="form-error">{error}</div>
    ) : hint ? (
      <div className="form-item__hint">{hint}</div>
    ) : null}
  </div>
);

export default InputField;
