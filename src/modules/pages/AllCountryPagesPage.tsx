import { useState } from "react";
import { App, Button, Space } from "antd";
import type { TableProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import DateRangePicker from "@/components/common/DateRangePicker";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { Page } from "./pagesSlice";
import { removeCountryPage } from "./countryPagesSlice";

const columns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): TableProps<Page>["columns"] => [
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Author", dataIndex: "author", key: "author" },
  {
    title: "Publish Date",
    dataIndex: "publishDate",
    key: "publishDate",
    render: (value: string) => dayjs(value).format("MMM D, YYYY"),
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

const AllCountryPagesPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const pages = useAppSelector((state) => state.countryPages.items);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;

  const handleTableChange: TableProps<Page>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeCountryPage(id));
    message.success("Country page deleted.");
  };

  const query = search.trim().toLowerCase();
  const dataSource = pages.filter((page) => {
    const matchesSearch =
      !query ||
      page.title.toLowerCase().includes(query) ||
      page.author.toLowerCase().includes(query);

    const matchesDate =
      !dateRange ||
      (dayjs(page.publishDate).isAfter(dateRange[0].startOf("day")) &&
        dayjs(page.publishDate).isBefore(dateRange[1].endOf("day")));

    return matchesSearch && matchesDate;
  });

  return (
    <>
      <Breadcrumb />

      <DataTable<Page>
        title="All Country Pages"
        extra={
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => navigate("/pages/country/create")}
          >
            New Country Page
          </Button>
        }
        filters={
          <DateRangePicker
            onChange={(value) => setDateRange(value as [Dayjs, Dayjs] | null)}
          />
        }
        searchable
        searchPlaceholder="Search country pages..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns(
          (id) => navigate(`/pages/country/edit/${id}`),
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

export default AllCountryPagesPage;
