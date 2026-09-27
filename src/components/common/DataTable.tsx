import { Key, ReactNode } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import SearchInput from "./SearchInput";

export interface DataTableProps<T> extends Omit<TableProps<T>, "title"> {
  title?: ReactNode;
  extra?: ReactNode;
  /** Page-level navigation (e.g. a <PageTabs />) rendered under the header. */
  nav?: ReactNode;
  /** Filter controls rendered in a row above the table. */
  filters?: ReactNode;
  searchable?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Enables checkbox row selection. */
  selectable?: boolean;
  selectedRowKeys?: Key[];
  onSelectionChange?: (keys: Key[], rows: T[]) => void;
}

const DataTable = <T extends object>({
  title,
  extra,
  nav,
  filters,
  searchable = false,
  searchValue,
  onSearchChange,
  searchPlaceholder = "Search",
  selectable = false,
  selectedRowKeys,
  onSelectionChange,
  rowSelection,
  pagination,
  rowKey = "id",
  ...tableProps
}: DataTableProps<T>) => {
  const hasHeader = Boolean(title || extra);
  const hasFilters = Boolean(filters || searchable);

  const selection: TableProps<T>["rowSelection"] = selectable
    ? {
        selectedRowKeys,
        onChange: (keys, rows) => onSelectionChange?.(keys, rows),
        ...rowSelection,
      }
    : rowSelection;

  return (
    <div className="data-table flex flex-col gap-4">
      {hasHeader ? (
        <div className="flex items-center justify-between gap-4">
          {title ? (
            <h2 className="data-table__title text-2xl font-semibold text-brand">
              {title}
            </h2>
          ) : null}
          {extra}
        </div>
      ) : null}

      {nav}

      {hasFilters ? (
        <div className="flex flex-wrap items-center gap-3">
          {filters}
          {searchable ? (
            <SearchInput
              className="ml-auto w-full max-w-xs"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(event) => onSearchChange?.(event.target.value)}
            />
          ) : null}
        </div>
      ) : null}

      <Table<T>
        rowKey={rowKey}
        rowSelection={selection}
        pagination={
          pagination === false
            ? false
            : {
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `${range[0]} to ${range[1]} of ${total}`,
                showQuickJumper: true,
                ...(typeof pagination === "object" ? pagination : {}),
              }
        }
        {...tableProps}
      />
    </div>
  );
};

export default DataTable;
