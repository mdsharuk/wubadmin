import { useState } from "react";
import { App, Button, Descriptions, Modal, Space } from "antd";
import type { TableProps } from "antd";
import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import SelectField from "@/components/common/SelectField";
import StatusPill, {
  StatusPillVariant,
} from "@/components/common/StatusPill";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Company, removeCompany } from "./companiesSlice";

const statusVariant: Record<Company["status"], StatusPillVariant> = {
  Active: "success",
  Inactive: "default",
};

const columns = (
  onView: (company: Company) => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): TableProps<Company>["columns"] => [
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Website",
    dataIndex: "website",
    key: "website",
    render: (value: string) => (
      <a href={value} target="_blank" rel="noreferrer">
        {value}
      </a>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: Company["status"]) => (
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
          icon={<FiEye />}
          onClick={() => onView(record)}
          aria-label="View"
        />
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

const AllCompaniesPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.items);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Company | null>(null);
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

  const handleTableChange: TableProps<Company>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeCompany(id));
    message.success("Company deleted.");
  };

  const query = search.trim().toLowerCase();
  const dataSource = companies.filter((item) => {
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.website.toLowerCase().includes(query);

    const matchesStatus = !status || item.status.toLowerCase() === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Breadcrumb />

      <DataTable<Company>
        title="All Companies"
        extra={
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => navigate("/rankings/companies/create")}
          >
            Add New Company
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
        searchPlaceholder="Search companies..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns(
          setViewing,
          (id) => navigate(`/rankings/companies/edit/${id}`),
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

      <Modal
        open={Boolean(viewing)}
        title={viewing?.name}
        onCancel={() => setViewing(null)}
        footer={
          <Button onClick={() => setViewing(null)}>Close</Button>
        }
      >
        {viewing ? (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Name">{viewing.name}</Descriptions.Item>
            <Descriptions.Item label="Website">
              <a href={viewing.website} target="_blank" rel="noreferrer">
                {viewing.website}
              </a>
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {viewing.description ? (
                <span
                  dangerouslySetInnerHTML={{ __html: viewing.description }}
                />
              ) : (
                "—"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <StatusPill
                label={viewing.status}
                variant={statusVariant[viewing.status]}
              />
            </Descriptions.Item>
          </Descriptions>
        ) : null}
      </Modal>
    </>
  );
};

export default AllCompaniesPage;

