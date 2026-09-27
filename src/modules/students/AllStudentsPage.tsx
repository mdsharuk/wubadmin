import { Key, useState } from "react";
import { App, Button, Space } from "antd";
import type { TableProps } from "antd";
import { FiEdit2, FiEye, FiPlus, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import SelectField from "@/components/common/SelectField";
import StatusPill, {
  StatusPillVariant,
} from "@/components/common/StatusPill";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  Student,
  removeStudent,
  removeStudents,
  updateStudent,
} from "./studentsSlice";

const statusVariant: Record<Student["status"], StatusPillVariant> = {
  Active: "success",
  Enrolled: "info",
  Inactive: "default",
  Graduated: "warning",
  Trashed: "danger",
};

const columns = (
  onView: (id: string) => void,
  onEdit: (id: string) => void,
  onTrash: (student: Student) => void,
  onRestore: (student: Student) => void,
  onDelete: (id: string) => void,
): TableProps<Student>["columns"] => [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Student Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Contact", dataIndex: "contact", key: "contact" },
  { title: "Destinations", dataIndex: "destinations", key: "destinations" },
  { title: "Study Levels", dataIndex: "studyLevels", key: "studyLevels" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value: Student["status"]) => (
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
          <Button
            icon={<FiTrash2 />}
            onClick={() => onDelete(record.id)}
            aria-label="Delete"
          />
        </Space>
      ) : (
        <Space size={8} className="table-actions">
          <Button
            icon={<FiEye />}
            onClick={() => onView(record.id)}
            aria-label="View"
          />
          <Button
            icon={<FiEdit2 />}
            onClick={() => onEdit(record.id)}
            aria-label="Edit"
          />
          <Button
            icon={<FiTrash2 />}
            onClick={() => onTrash(record)}
            aria-label="Trash"
          />
        </Space>
      ),
  },
];

const AllStudentsPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const students = useAppSelector((state) => state.students.items);
  const [search, setSearch] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
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

  const query = search.trim().toLowerCase();
  const dataSource = students.filter((student) => {
    if (student.status === "Trashed") return false;

    const matchesSearch =
      !query ||
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.contact.toLowerCase().includes(query) ||
      student.destinations.toLowerCase().includes(query) ||
      student.studyLevels.toLowerCase().includes(query);

    const matchesStatus = !status || student.status.toLowerCase() === status;

    return matchesSearch && matchesStatus;
  });

  const handleTableChange: TableProps<Student>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const handleDelete = (id: string) => {
    dispatch(removeStudent(id));
    setSelectedRowKeys((keys) => keys.filter((key) => key !== id));
    message.success("Student deleted.");
  };

  const handleDeleteSelected = () => {
    dispatch(removeStudents(selectedRowKeys as string[]));
    message.success(`${selectedRowKeys.length} students deleted.`);
    setSelectedRowKeys([]);
  };

  const handleTrash = (student: Student) => {
    dispatch(updateStudent({ ...student, status: "Trashed" }));
    message.success("Student moved to trash.");
  };

  const handleRestore = (student: Student) => {
    dispatch(updateStudent({ ...student, status: "Active" }));
    message.success("Student restored.");
  };

  return (
    <>
      <Breadcrumb />

      <DataTable<Student>
        title="All Students"
        extra={
          <Space>
            {selectedRowKeys.length > 0 ? (
              <Button
                danger
                icon={<FiTrash2 />}
                onClick={handleDeleteSelected}
              >
                Delete ({selectedRowKeys.length})
              </Button>
            ) : null}
            <Button
              type="primary"
              icon={<FiPlus />}
              onClick={() => navigate("/students/create")}
            >
              Create New Student
            </Button>
          </Space>
        }
        filters={
          <SelectField
            placeholder="All statuses"
            width={170}
            value={status || undefined}
            onChange={(value) => handleStatusChange(value as string | undefined)}
            options={[
              { value: "active", label: "Active" },
              { value: "enrolled", label: "Enrolled" },
              { value: "inactive", label: "Inactive" },
              { value: "graduated", label: "Graduated" },
            ]}
          />
        }
        searchable
        searchPlaceholder="Search students..."
        searchValue={search}
        onSearchChange={setSearch}
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={setSelectedRowKeys}
        columns={columns(
          (id) => navigate(`/students/view/${id}`),
          (id) => navigate(`/students/edit/${id}`),
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

export default AllStudentsPage;
