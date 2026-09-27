import { useState } from "react";
import { Badge, Button, Space } from "antd";
import type { TableProps } from "antd";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import SelectField from "@/components/common/SelectField";
import DateRangePicker from "@/components/common/DateRangePicker";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: "New" | "Read" | "Replied" | "Trashed";
}

const names = [
  "Ayesha Rahman",
  "Daniel Okafor",
  "Priya Sharma",
  "Minh Nguyen",
  "Fatima Noor",
  "Kwame Mensah",
  "Sofia Rossi",
  "Hiroshi Tanaka",
  "Nimal Perera",
  "Grace Lim",
  "Omar Farouk",
  "Ravi Kumar",
  "Elena Petrova",
  "Liam O'Brien",
  "Chen Wei",
];

const subjects = [
  "Question about admissions",
  "Scholarship eligibility",
  "Visa requirements",
  "Course fees",
  "Accommodation support",
  "Partnership enquiry",
];

const statuses: ContactMessage["status"][] = [
  "New",
  "Read",
  "Replied",
  "Trashed",
];

const messages: ContactMessage[] = names.map((name, index) => ({
  id: String(index + 1),
  name,
  email: `${name.split(" ")[0].toLowerCase()}@example.test`,
  subject: subjects[index % subjects.length],
  status: statuses[index % statuses.length],
}));

const columns: TableProps<ContactMessage>["columns"] = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Subject", dataIndex: "subject", key: "subject" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: ContactMessage["status"]) => (
      <Badge
        status={
          value === "Replied"
            ? "success"
            : value === "New"
              ? "processing"
              : "default"
        }
        text={value}
      />
    ),
  },
  {
    title: "Actions",
    key: "actions",
    align: "right",
    render: () => (
      <Space size={4}>
        <Button type="text" size="small" icon={<FiEye />} />
        <Button type="text" size="small" icon={<FiTrash2 />} />
      </Space>
    ),
  },
];

const ContactUsPage = () => {
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;

  const handleTableChange: TableProps<ContactMessage>["onChange"] = (
    pagination,
  ) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  return (
    <>
      <Breadcrumb />

      <DataTable<ContactMessage>
        title="Contact Us"
        filters={
          <>
            <SelectField placeholder="All statuses" width={170} />
            <DateRangePicker />
          </>
        }
        searchable
        searchPlaceholder="Search messages..."
        searchValue={search}
        onSearchChange={setSearch}
        columns={columns}
        dataSource={messages}
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

export default ContactUsPage;
