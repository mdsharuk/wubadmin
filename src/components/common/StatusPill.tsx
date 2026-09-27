export type StatusPillVariant =
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "default";

export interface StatusPillProps {
  label: string;
  variant?: StatusPillVariant;
}

const StatusPill = ({ label, variant = "default" }: StatusPillProps) => (
  <span className={`status-pill status-pill--${variant}`}>
    <span className="status-pill__dot" />
    {label}
  </span>
);

export default StatusPill;
