import { ReactNode, useEffect, useRef } from "react";
import InputField from "./InputField";

/** Converts a string into a URL-friendly slug. */
export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export interface SlugFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  /** Source text (e.g. the title) used to auto-generate the slug. */
  source?: string;
  label?: ReactNode;
  required?: boolean;
  error?: ReactNode;
  hint?: ReactNode;
  fieldClassName?: string;
  placeholder?: string;
}

const SlugField = ({
  value = "",
  onChange,
  source = "",
  label = "Slug",
  required = false,
  error,
  hint,
  fieldClassName,
  placeholder = "auto-generated-from-title",
}: SlugFieldProps) => {
  const manualRef = useRef(false);
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;

  useEffect(() => {
    if (manualRef.current) return;
    onChangeRef.current?.(slugify(source));
  }, [source]);

  return (
    <InputField
      label={label}
      required={required}
      error={error}
      hint={hint}
      fieldClassName={fieldClassName}
      placeholder={placeholder}
      value={value}
      onChange={(event) => {
        manualRef.current = true;
        onChangeRef.current?.(slugify(event.target.value));
      }}
    />
  );
};

export default SlugField;
