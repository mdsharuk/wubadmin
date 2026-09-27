import { useState } from "react";
import { App, Button, Popconfirm, Space } from "antd";
import type { TableProps } from "antd";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import DateRangePicker from "@/components/common/DateRangePicker";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { BlogCategory, removeCategory } from "./blogCategoriesSlice";

const columns = (
  onEdit: (id: string) => void,
  onDelete: (id: string) => void,
): TableProps<BlogCategory>["columns"] => [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Description", dataIndex: "description", key: "description" },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
    render: (value: string) => <span className="blog-slug">{value}</span>,
  },
  { title: "Count", dataIndex: "count", key: "count", align: "right" },
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
          title="Delete this category?"
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

const BlogCategoriesPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.blogCategories.items);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;

  const handleTableChange: TableProps<BlogCategory>["onChange"] = (
    pagination,
  ) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeCategory(id));
    message.success("Category deleted.");
  };

  return (
    <>
      <Breadcrumb />

      <DataTable<BlogCategory>
        title="Blog Categories"
        extra={
          <Button
            type="primary"
            icon={<FiPlus />}
            onClick={() => navigate("/blog/categories/create")}
          >
            Create New
          </Button>
        }
        filters={<DateRangePicker />}
        searchable
        searchPlaceholder="Search categories..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns(
          (id) => navigate(`/blog/categories/edit/${id}`),
          handleDelete,
        )}
        dataSource={categories}
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

export default BlogCategoriesPage;
