import { ComponentProps, ReactNode } from "react";
import { Input } from "antd";

type TextAreaProps = ComponentProps<typeof Input.TextArea>;

export interface TextAreaFieldProps extends TextAreaProps {
  /** Field title/label. */
  label?: ReactNode;
  /** Marks the field as required (adds a red asterisk). */
  required?: boolean;
  /** Error message shown below the field. */
  error?: ReactNode;
  /** Helper text shown when there is no error. */
  hint?: ReactNode;
  /** Wrapper class name. */
  fieldClassName?: string;
}

const TextAreaField = ({
  label,
  required = false,
  error,
  hint,
  fieldClassName,
  id,
  rows = 4,
  ...textAreaProps
}: TextAreaFieldProps) => (
  <div
    className={["form-item", fieldClassName ?? ""].filter(Boolean).join(" ")}
  >
    {label ? (
      <label htmlFor={id}>
        {label}
        {required ? <span className="form-item__required">*</span> : null}
      </label>
    ) : null}

    <Input.TextArea
      id={id}
      rows={rows}
      status={error ? "error" : undefined}
      {...textAreaProps}
    />

    {error ? (
      <div className="form-error">{error}</div>
    ) : hint ? (
      <div className="form-item__hint">{hint}</div>
    ) : null}
  </div>
);

export default TextAreaField;
