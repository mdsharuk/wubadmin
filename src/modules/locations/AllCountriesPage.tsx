import { useState } from "react";
import { App, Button, Space } from "antd";
import type { TableProps } from "antd";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import SelectField from "@/components/common/SelectField";
import StatusPill, {
  StatusPillVariant,
} from "@/components/common/StatusPill";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Country, removeCountry } from "./countriesSlice";

const statusVariant: Record<Country["status"], StatusPillVariant> = {
  Active: "success",
  Inactive: "default",
};

const columns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): TableProps<Country>["columns"] => [
  { title: "Country Name", dataIndex: "name", key: "name" },
  { title: "Capital", dataIndex: "capital", key: "capital" },
  { title: "Currency", dataIndex: "currency", key: "currency" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: Country["status"]) => (
      <StatusPill label={value} variant={statusVariant[value]} />
    ),
  },
  {
    title: "Actions",
    key: "actions",
    align: "right",
    render: (_, record) => (
      <Space size={8} className="table-actions">
        <Button
          icon={<FiEdit2 />}
          onClick={() => onEdit(record.id)}
          aria-label="Edit"
        />
        <Button
          icon={<FiTrash2 />}
          onClick={() => onDelete(record.id)}
          aria-label="Delete"
        />
      </Space>
    ),
  },
];

const AllCountriesPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.countries.items);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;
  const status = searchParams.get("status") ?? "";

  const handleStatusChange = (value?: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("status", value);
    else next.delete("status");
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const handleTableChange: TableProps<Country>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeCountry(id));
    message.success("Country deleted.");
  };

  const query = search.trim().toLowerCase();
  const dataSource = countries.filter((item) => {
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.capital.toLowerCase().includes(query) ||
      item.currency.toLowerCase().includes(query);

    const matchesStatus = !status || item.status.toLowerCase() === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Breadcrumb />

      <DataTable<Country>
        title="Countries"
        extra={
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => navigate("/locations/countries/create")}
          >
            Add New Country
          </Button>
        }
        filters={
          <SelectField
            placeholder="All statuses"
            width={170}
            value={status || undefined}
            onChange={(value) => handleStatusChange(value as string | undefined)}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
        }
        searchable
        searchPlaceholder="Search countries..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns(
          (id) => navigate(`/locations/countries/edit/${id}`),
          handleDelete,
        )}
        dataSource={dataSource}
        onChange={handleTableChange}
        pagination={{
          current: page,
          pageSize,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
        }}
      />
    </>
  );
};

export default AllCountriesPage;
