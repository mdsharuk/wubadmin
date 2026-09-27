import { Key, useState } from "react";
import { Button, Space } from "antd";
import type { TableProps } from "antd";
import { FiEdit2, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import DataTable from "@/components/common/DataTable";
import PageTabs from "@/components/common/PageTabs";
import SelectField from "@/components/common/SelectField";
import FilterActions from "@/components/common/FilterActions";

interface Course {
  id: string;
  title: string;
  specialization: string;
  university: string;
  level: string;
  duration: string;
  status: string;
  createdAt: string;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Bachelor of Arts",
    specialization: "Art and Design",
    university: "The University of Melbourne",
    level: "Undergraduate",
    duration: "36 months",
    status: "ACTIVE",
    createdAt: "March 2, 2026",
  },
  {
    id: "2",
    title: "Doctor of Business Administration",
    specialization: "Procurement",
    university: "The University of Notre Dame, Australia",
    level: "Doctorate / PhD",
    duration: "4",
    status: "ACTIVE",
    createdAt: "January 11, 2026",
  },
  {
    id: "3",
    title: "Master of Architecture",
    specialization: "Operations Research",
    university: "The University of Notre Dame, Australia",
    level: "Postgraduate",
    duration: "1",
    status: "ACTIVE",
    createdAt: "January 11, 2026",
  },
  {
    id: "4",
    title: "Bachelor of Accounting",
    specialization: "Transportation Management",
    university: "The University of Notre Dame, Australia",
    level: "Undergraduate",
    duration: "4",
    status: "ACTIVE",
    createdAt: "January 11, 2026",
  },
  {
    id: "5",
    title: "Master of Data Science",
    specialization: "Data Analytics",
    university: "The University of Melbourne",
    level: "Postgraduate",
    duration: "2",
    status: "TRASHED",
    createdAt: "December 20, 2025",
  },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "draft", label: "Draft" },
  { key: "trashed", label: "Trashed" },
];

const columns: TableProps<Course>["columns"] = [
  { title: "Course Title", dataIndex: "title", key: "title" },
  {
    title: "Course Specialization",
    dataIndex: "specialization",
    key: "specialization",
  },
  { title: "University", dataIndex: "university", key: "university" },
  { title: "Course Level", dataIndex: "level", key: "level" },
  { title: "Duration", dataIndex: "duration", key: "duration" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
  {
    title: "Actions",
    key: "actions",
    align: "right",
    render: (_, record) =>
      record.status === "TRASHED" ? (
        <Space size={4}>
          <Button type="text" size="small" icon={<FiRotateCcw />} />
          <Button type="text" size="small" icon={<FiTrash2 />} />
        </Space>
      ) : (
        <Space size={4}>
          <Button type="text" size="small" icon={<FiEdit2 />} />
          <Button type="text" size="small" icon={<FiTrash2 />} />
        </Space>
      ),
  },
];

const CoursesTableDemo = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const dataSource = courses.filter((course) =>
    activeTab === "all" ? true : course.status.toLowerCase() === activeTab,
  );

  const filters = (
    <>
      <SelectField placeholder="Select Country" width={160} />
      <SelectField placeholder="Select University" width={160} />
      <SelectField placeholder="Select Specialization" width={170} />
      <SelectField placeholder="Select Level" width={150} />
      <FilterActions />
    </>
  );

  return (
    <DataTable<Course>
      title="All Courses"
      extra={
        <Space>
          {selectedKeys.length > 0 ? (
            <Button danger icon={<FiTrash2 />}>
              Delete ({selectedKeys.length})
            </Button>
          ) : null}
          <Button type="primary">Add Course</Button>
        </Space>
      }
      nav={
        <PageTabs
          items={TABS}
          activeKey={activeTab}
          onChange={setActiveTab}
        />
      }
      filters={filters}
      searchable
      searchValue={search}
      onSearchChange={setSearch}
      searchPlaceholder="Search University"
      selectable
      selectedRowKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      columns={columns}
      dataSource={dataSource}
    />
  );
};

export default CoursesTableDemo;
