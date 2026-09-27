import { useState } from "react";
import { App, Button, Popconfirm, Space } from "antd";
import type { TableProps } from "antd";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import DateRangePicker from "@/components/common/DateRangePicker";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { BlogAuthor, removeAuthor } from "./blogAuthorsSlice";

const columns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): TableProps<BlogAuthor>["columns"] => [
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Display Name", dataIndex: "displayName", key: "displayName" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Posts", dataIndex: "posts", key: "posts", align: "right" },
  {
    title: "Actions",
    key: "actions",
    align: "right",
    render: (_, record) => (
      <Space size={4}>
        <Button
          type="text"
          size="small"
          icon={<FiEdit2 />}
          onClick={() => onEdit(record.id)}
        />
        <Popconfirm
          title="Delete this author?"
          okText="Delete"
          okButtonProps={{ danger: true }}
          onConfirm={() => onDelete(record.id)}
        >
          <Button type="text" size="small" icon={<FiTrash2 />} />
        </Popconfirm>
      </Space>
    ),
  },
];

const BlogAuthorsPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authors = useAppSelector((state) => state.blogAuthors.items);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;

  const handleTableChange: TableProps<BlogAuthor>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeAuthor(id));
    message.success("Author deleted.");
  };

  return (
    <>
      <Breadcrumb />

      <DataTable<BlogAuthor>
        title="Authors"
        extra={
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => navigate("/blog/authors/create")}
          >
            Create New Author
          </Button>
        }
        filters={<DateRangePicker />}
        searchable
        searchPlaceholder="Search authors..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns(
          (id) => navigate(`/blog/authors/edit/${id}`),
          handleDelete,
        )}
        dataSource={authors}
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

export default BlogAuthorsPage;
