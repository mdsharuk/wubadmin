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
import { Region, removeRegion } from "./regionsSlice";

const statusVariant: Record<Region["status"], StatusPillVariant> = {
  Active: "success",
  Inactive: "default",
};

const columns = (
  onView: (region: Region) => void,
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): TableProps<Region>["columns"] => [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Description", dataIndex: "description", key: "description" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: Region["status"]) => (
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

const AllRegionsPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const regions = useAppSelector((state) => state.regions.items);
  const [search, setSearch] = useState("");
  const [viewing, setViewing] = useState<Region | null>(null);
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

  const handleTableChange: TableProps<Region>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeRegion(id));
    message.success("Region deleted.");
  };

  const query = search.trim().toLowerCase();
  const dataSource = regions.filter((item) => {
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchesStatus = !status || item.status.toLowerCase() === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <Breadcrumb />

      <DataTable<Region>
        title="Regions"
        extra={
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => navigate("/locations/regions/create")}
          >
            Add New Region
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
        searchPlaceholder="Search regions..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns(
          setViewing,
          (id) => navigate(`/locations/regions/edit/${id}`),
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
        footer={<Button onClick={() => setViewing(null)}>Close</Button>}
      >
        {viewing ? (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Name">{viewing.name}</Descriptions.Item>
            <Descriptions.Item label="Description">
              {viewing.description || "—"}
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

export default AllRegionsPage;
