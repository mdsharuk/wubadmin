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
import { Ranking, removeRanking } from "./rankingsSlice";

const statusVariant: Record<Ranking["status"], StatusPillVariant> = {
  Published: "success",
  Draft: "default",
};

const typeOptions = [
  { value: "World University Rankings", label: "World University Rankings" },
  { value: "Subject Rankings", label: "Subject Rankings" },
  { value: "Regional Rankings", label: "Regional Rankings" },
  { value: "Business School Rankings", label: "Business School Rankings" },
];

const columns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): TableProps<Ranking>["columns"] => [
  { title: "University", dataIndex: "university", key: "university" },
  { title: "Ranking Company", dataIndex: "company", key: "company" },
  { title: "Ranking Type", dataIndex: "type", key: "type" },
  { title: "Edition / Year", dataIndex: "edition", key: "edition" },
  { title: "Rank", dataIndex: "rank", key: "rank" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: Ranking["status"]) => (
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

const AllRankingsPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const rankings = useAppSelector((state) => state.rankings.items);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;
  const type = searchParams.get("type") ?? "";
  const status = searchParams.get("status") ?? "";

  const setFilter = (key: string, value?: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const handleTableChange: TableProps<Ranking>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeRanking(id));
    message.success("Ranking deleted.");
  };

  const query = search.trim().toLowerCase();
  const dataSource = rankings.filter((item) => {
    const matchesSearch =
      !query ||
      item.university.toLowerCase().includes(query) ||
      item.company.toLowerCase().includes(query) ||
      item.edition.toLowerCase().includes(query) ||
      item.rank.toLowerCase().includes(query);

    const matchesType = !type || item.type === type;
    const matchesStatus = !status || item.status.toLowerCase() === status;

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <>
      <Breadcrumb />

      <DataTable<Ranking>
        title="Rankings"
        extra={
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => navigate("/rankings/create")}
          >
            Add New Ranking
          </Button>
        }
        filters={
          <>
            <SelectField
              placeholder="All ranking types"
              width={220}
              value={type || undefined}
              onChange={(value) => setFilter("type", value as string | undefined)}
              options={typeOptions}
            />
            <SelectField
              placeholder="All statuses"
              width={170}
              value={status || undefined}
              onChange={(value) =>
                setFilter("status", value as string | undefined)
              }
              options={[
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
              ]}
            />
          </>
        }
        searchable
        searchPlaceholder="Search rankings..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns(
          (id) => navigate(`/rankings/edit/${id}`),
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

export default AllRankingsPage;
