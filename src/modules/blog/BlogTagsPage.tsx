import { useState } from "react";
import { App, Button } from "antd";
import type { TableProps } from "antd";
import { FiPlus } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import InputField from "@/components/common/InputField";
import SlugField from "@/components/common/SlugField";
import ShortDescriptionEditor from "@/components/common/ShortDescriptionEditor";

interface BlogTag {
  id: string;
  name: string;
  description: string;
  slug: string;
  count: number;
}

const seedTags: BlogTag[] = [
  {
    id: "1",
    name: "Rankings",
    description: "Posts about university rankings",
    slug: "rankings",
    count: 12,
  },
  {
    id: "2",
    name: "Admissions",
    description: "Admission guides and requirements",
    slug: "admissions",
    count: 9,
  },
  {
    id: "3",
    name: "Scholarship",
    description: "Scholarships and funding",
    slug: "scholarship",
    count: 15,
  },
  {
    id: "4",
    name: "Visa",
    description: "Student visa information",
    slug: "visa",
    count: 7,
  },
  {
    id: "5",
    name: "IELTS",
    description: "IELTS test preparation",
    slug: "ielts",
    count: 6,
  },
  {
    id: "6",
    name: "Budget",
    description: "Budgeting and cost of living",
    slug: "budget",
    count: 5,
  },
];

const columns: TableProps<BlogTag>["columns"] = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Description", dataIndex: "description", key: "description" },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
    render: (value: string) => <span className="blog-slug">{value}</span>,
  },
  { title: "Count", dataIndex: "count", key: "count", align: "right" },
];

const BlogTagsPage = () => {
  const { message } = App.useApp();
  const [tags, setTags] = useState<BlogTag[]>(seedTags);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;

  const handleTableChange: TableProps<BlogTag>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleAdd = () => {
    if (!name.trim()) {
      message.warning("Tag name is required.");
      return;
    }
    setTags((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: name.trim(),
        description,
        slug,
        count: 0,
      },
    ]);
    setName("");
    setSlug("");
    setDescription("");
    message.success("Tag added.");
  };

  const filtered = tags.filter((tag) =>
    tag.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <Breadcrumb />

      <h1 className="blog-editor__title">Tags</h1>

      <div className="blog-tags">
        <div className="blog-tags__form">
          <InputField
            id="name"
            label="Name"
            placeholder="Tag name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <SlugField value={slug} onChange={setSlug} source={name} label="Slug" />

          <div className="form-item">
            <label>Description</label>
            <ShortDescriptionEditor
              value={description}
              onChange={setDescription}
              placeholder="Describe this tag..."
            />
          </div>

          <Button type="primary" block icon={<FiPlus />} onClick={handleAdd}>
            Add Tag
          </Button>
        </div>

        <div className="blog-tags__table">
          <DataTable<BlogTag>
            searchable
            searchPlaceholder="Search tags..."
            searchValue={search}
            onSearchChange={setSearch}
            columns={columns}
            dataSource={filtered}
            onChange={handleTableChange}
            pagination={{
              current: page,
              pageSize,
              showSizeChanger: true,
              showTotal: (total, range) =>
                `${range[0]} to ${range[1]} of ${total}`,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogTagsPage;
