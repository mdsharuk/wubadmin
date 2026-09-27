import { Key, useState } from "react";
import { App, Button, Popconfirm, Space } from "antd";
import type { TableProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FiEdit2, FiPlus, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import PageTabs from "@/components/common/PageTabs";
import SelectField from "@/components/common/SelectField";
import DateRangePicker from "@/components/common/DateRangePicker";
import StatusPill, {
  StatusPillVariant,
} from "@/components/common/StatusPill";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { BlogPost, removePost, removePosts, updatePost } from "./blogSlice";

const TABS = [
  { key: "all", label: "All" },
  { key: "published", label: "Published" },
  { key: "draft", label: "Draft" },
  { key: "trashed", label: "Trashed" },
];

const statusVariant: Record<BlogPost["status"], StatusPillVariant> = {
  Published: "success",
  Draft: "default",
  Trashed: "danger",
};

const columns = (
  onEdit: (id: string) => void,
  onTrash: (post: BlogPost) => void,
  onRestore: (post: BlogPost) => void,
  onDelete: (id: string) => void,
): TableProps<BlogPost>["columns"] => [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Title", dataIndex: "title", key: "title" },
  { title: "Author", dataIndex: "author", key: "author" },
  { title: "Categories", dataIndex: "categories", key: "categories" },
  { title: "Tags", dataIndex: "tags", key: "tags" },
  { title: "Publish Date", dataIndex: "publishDate", key: "publishDate" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: BlogPost["status"]) => (
      <StatusPill label={value} variant={statusVariant[value]} />
    ),
  },
  {
    title: "Actions",
    key: "actions",
    align: "right",
    render: (_, record) =>
      record.status === "Trashed" ? (
        <Space size={8} className="table-actions">
          <Button
            icon={<FiRotateCcw />}
            onClick={() => onRestore(record)}
            aria-label="Restore"
          />
          <Popconfirm
            title="Delete permanently?"
            okText="Delete"
            okButtonProps={{ danger: true }}
            onConfirm={() => onDelete(record.id)}
          >
            <Button icon={<FiTrash2 />} aria-label="Delete" />
          </Popconfirm>
        </Space>
      ) : (
        <Space size={8} className="table-actions">
          <Button
            icon={<FiEdit2 />}
            onClick={() => onEdit(record.id)}
            aria-label="Edit"
          />
          <Popconfirm
            title="Move this post to trash?"
            okText="Trash"
            okButtonProps={{ danger: true }}
            onConfirm={() => onTrash(record)}
          >
            <Button icon={<FiTrash2 />} aria-label="Trash" />
          </Popconfirm>
        </Space>
      ),
  },
];

const AllBlogPostsPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.blog.posts);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;
  const status = searchParams.get("status") ?? "all";
  const category = searchParams.get("category") ?? "";
  const author = searchParams.get("author") ?? "";

  const categoryOptions = Array.from(
    new Set(posts.map((post) => post.categories)),
  ).map((value) => ({ value, label: value }));

  const authorOptions = Array.from(
    new Set(posts.map((post) => post.author)),
  ).map((value) => ({ value, label: value }));

  const query = search.trim().toLowerCase();
  const dataSource = posts.filter((post) => {
    const matchesStatus =
      status === "all"
        ? post.status !== "Trashed"
        : post.status.toLowerCase() === status;

    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.tags.toLowerCase().includes(query) ||
      post.categories.toLowerCase().includes(query);

    const matchesCategory = !category || post.categories === category;
    const matchesAuthor = !author || post.author === author;

    const publishedAt = dayjs(post.publishDate.split(" · ")[0]);
    const matchesDate =
      !dateRange ||
      (publishedAt.isAfter(dateRange[0].startOf("day")) &&
        publishedAt.isBefore(dateRange[1].endOf("day")));

    return (
      matchesStatus &&
      matchesSearch &&
      matchesCategory &&
      matchesAuthor &&
      matchesDate
    );
  });

  const handleStatusChange = (key: string) => {
    const next = new URLSearchParams(searchParams);
    next.set("status", key);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const setFilter = (key: string, value?: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const handleTableChange: TableProps<BlogPost>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removePost(id));
    setSelectedRowKeys((keys) => keys.filter((key) => key !== id));
    message.success("Post deleted.");
  };

  const handleTrash = (post: BlogPost) => {
    dispatch(updatePost({ ...post, status: "Trashed" }));
    message.success("Post moved to trash.");
  };

  const handleRestore = (post: BlogPost) => {
    dispatch(updatePost({ ...post, status: "Draft" }));
    message.success("Post restored.");
  };

  const handleDeleteSelected = () => {
    dispatch(removePosts(selectedRowKeys as string[]));
    message.success(`${selectedRowKeys.length} posts deleted.`);
    setSelectedRowKeys([]);
  };

  return (
    <>
      <Breadcrumb />

      <DataTable<BlogPost>
        title="All Blog Posts"
        extra={
          <Space>
            {selectedRowKeys.length > 0 ? (
              <Popconfirm
                title={`Delete ${selectedRowKeys.length} selected posts?`}
                okText="Delete"
                okButtonProps={{ danger: true }}
                onConfirm={handleDeleteSelected}
              >
                <Button danger icon={<FiTrash2 />}>
                  Delete ({selectedRowKeys.length})
                </Button>
              </Popconfirm>
            ) : null}
            <Button
              type="primary"
              icon={<FiPlus />}
              onClick={() => navigate("/blog/create")}
            >
              New Blog Post
            </Button>
          </Space>
        }
        nav={
          <PageTabs
            items={TABS}
            activeKey={status}
            onChange={handleStatusChange}
          />
        }
        filters={
          <>
            <SelectField
              placeholder="All statuses"
              width={160}
              value={status === "all" ? undefined : status}
              onChange={(value) => handleStatusChange((value as string) ?? "all")}
              options={[
                { value: "published", label: "Published" },
                { value: "draft", label: "Draft" },
                { value: "trashed", label: "Trashed" },
              ]}
            />
            <SelectField
              placeholder="All categories"
              width={170}
              value={category || undefined}
              onChange={(value) =>
                setFilter("category", value as string | undefined)
              }
              options={categoryOptions}
            />
            <SelectField
              placeholder="All authors"
              width={160}
              value={author || undefined}
              onChange={(value) =>
                setFilter("author", value as string | undefined)
              }
              options={authorOptions}
            />
            <DateRangePicker
              onChange={(value) =>
                setDateRange(value as [Dayjs, Dayjs] | null)
              }
            />
          </>
        }
        searchable
        searchPlaceholder="Search all blog posts..."
        searchValue={search}
        onSearchChange={setSearch}
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={setSelectedRowKeys}
        columns={columns(
          (id) => navigate(`/blog/edit/${id}`),
          handleTrash,
          handleRestore,
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

export default AllBlogPostsPage;
