import { ReactNode } from "react";

export interface PageTabItem {
  key: string;
  label: ReactNode;
}

export interface PageTabsProps {
  items: PageTabItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  className?: string;
}

const PageTabs = ({ items, activeKey, onChange, className }: PageTabsProps) => (
  <div className={["page-tabs", className ?? ""].filter(Boolean).join(" ")}>
    {items.map((item) => (
      <button
        key={item.key}
        type="button"
        className={[
          "page-tabs__tab",
          item.key === activeKey ? "page-tabs__tab--active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={() => onChange?.(item.key)}
      >
        {item.label}
      </button>
    ))}
  </div>
);

export default PageTabs;
