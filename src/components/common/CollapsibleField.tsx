import { ReactNode, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

export interface CollapsibleFieldProps {
  title?: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
  /** When false, the field renders as a normal (always open) section. */
  collapsible?: boolean;
}

const CollapsibleField = ({
  title,
  defaultOpen = true,
  children,
  className,
  collapsible = true,
}: CollapsibleFieldProps) => {
  const [open, setOpen] = useState(defaultOpen);

  const isOpen = collapsible ? open : true;
  const hasHeader = Boolean(title);

  return (
    <div
      className={[
        "collapsible-field",
        isOpen ? "collapsible-field--open" : "",
        collapsible ? "" : "collapsible-field--static",
        hasHeader ? "" : "collapsible-field--no-header",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {hasHeader ? (
        collapsible ? (
          <button
            type="button"
            className="collapsible-field__header"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            <span className="collapsible-field__title">{title}</span>
            <FiChevronDown className="collapsible-field__icon" />
          </button>
        ) : (
          <div className="collapsible-field__header">
            <span className="collapsible-field__title">{title}</span>
          </div>
        )
      ) : null}

      {isOpen ? <div className="collapsible-field__body">{children}</div> : null}
    </div>
  );
};

export default CollapsibleField;
