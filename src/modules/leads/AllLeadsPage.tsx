import { Key, useState } from "react";
import { App, Button, Space } from "antd";
import type { TableProps } from "antd";
import { useSearchParams } from "react-router-dom";
import { FiDownload, FiPlus, FiShare2 } from "react-icons/fi";
import Breadcrumb from "@/components/common/Breadcrumb";
import DataTable from "@/components/common/DataTable";
import SelectField from "@/components/common/SelectField";
import ShareLeadsModal from "./ShareLeadsModal";

interface Lead {
  id: string;
  studentName: string;
  destinationCountry: string;
  email: string;
  mobile: string;
  studyLevel: string;
  currentCountry: string;
}

const leads: Lead[] = [
  {
    id: "LD-0001",
    studentName: "Sample Lead 001",
    destinationCountry: "United Kingdom",
    email: "lead001@example.test",
    mobile: "+00 000 000 001",
    studyLevel: "Undergraduate",
    currentCountry: "India",
  },
  {
    id: "LD-0002",
    studentName: "Sample Lead 002",
    destinationCountry: "Canada",
    email: "lead002@example.test",
    mobile: "+00 000 000 002",
    studyLevel: "Postgraduate",
    currentCountry: "Bangladesh",
  },
  {
    id: "LD-0003",
    studentName: "Sample Lead 003",
    destinationCountry: "United States",
    email: "lead003@example.test",
    mobile: "+00 000 000 003",
    studyLevel: "Doctoral",
    currentCountry: "Nepal",
  },
  {
    id: "LD-0004",
    studentName: "Ayesha Rahman",
    destinationCountry: "Australia",
    email: "ayesha.rahman@example.test",
    mobile: "+00 000 000 004",
    studyLevel: "Postgraduate",
    currentCountry: "Bangladesh",
  },
  {
    id: "LD-0005",
    studentName: "Daniel Okafor",
    destinationCountry: "Germany",
    email: "daniel.okafor@example.test",
    mobile: "+00 000 000 005",
    studyLevel: "Undergraduate",
    currentCountry: "Nigeria",
  },
  {
    id: "LD-0006",
    studentName: "Priya Sharma",
    destinationCountry: "Canada",
    email: "priya.sharma@example.test",
    mobile: "+00 000 000 006",
    studyLevel: "Diploma",
    currentCountry: "India",
  },
  {
    id: "LD-0007",
    studentName: "Minh Nguyen",
    destinationCountry: "Japan",
    email: "minh.nguyen@example.test",
    mobile: "+00 000 000 007",
    studyLevel: "Postgraduate",
    currentCountry: "Vietnam",
  },
  {
    id: "LD-0008",
    studentName: "Fatima Noor",
    destinationCountry: "Netherlands",
    email: "fatima.noor@example.test",
    mobile: "+00 000 000 008",
    studyLevel: "Doctoral",
    currentCountry: "Pakistan",
  },
  {
    id: "LD-0009",
    studentName: "Kwame Mensah",
    destinationCountry: "United Kingdom",
    email: "kwame.mensah@example.test",
    mobile: "+00 000 000 009",
    studyLevel: "Undergraduate",
    currentCountry: "Ghana",
  },
  {
    id: "LD-0010",
    studentName: "Sofia Rossi",
    destinationCountry: "France",
    email: "sofia.rossi@example.test",
    mobile: "+00 000 000 010",
    studyLevel: "Foundation",
    currentCountry: "Egypt",
  },
  {
    id: "LD-0011",
    studentName: "Hiroshi Tanaka",
    destinationCountry: "New Zealand",
    email: "hiroshi.tanaka@example.test",
    mobile: "+00 000 000 011",
    studyLevel: "Postgraduate",
    currentCountry: "Japan",
  },
  {
    id: "LD-0012",
    studentName: "Nimal Perera",
    destinationCountry: "Singapore",
    email: "nimal.perera@example.test",
    mobile: "+00 000 000 012",
    studyLevel: "Undergraduate",
    currentCountry: "Sri Lanka",
  },
  {
    id: "LD-0013",
    studentName: "Grace Lim",
    destinationCountry: "United States",
    email: "grace.lim@example.test",
    mobile: "+00 000 000 013",
    studyLevel: "Diploma",
    currentCountry: "Philippines",
  },
  {
    id: "LD-0014",
    studentName: "Omar Farouk",
    destinationCountry: "Sweden",
    email: "omar.farouk@example.test",
    mobile: "+00 000 000 014",
    studyLevel: "Doctoral",
    currentCountry: "Egypt",
  },
  {
    id: "LD-0015",
    studentName: "Ravi Kumar",
    destinationCountry: "Ireland",
    email: "ravi.kumar@example.test",
    mobile: "+00 000 000 015",
    studyLevel: "Postgraduate",
    currentCountry: "India",
  },
];

const columns: TableProps<Lead>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (value: string) => <span className="leads-table__id">{value}</span>,
  },
  { title: "Student Name", dataIndex: "studentName", key: "studentName" },
  {
    title: "Destination Country",
    dataIndex: "destinationCountry",
    key: "destinationCountry",
  },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Mobile Number", dataIndex: "mobile", key: "mobile" },
  { title: "Study Level", dataIndex: "studyLevel", key: "studyLevel" },
  {
    title: "Current Country",
    dataIndex: "currentCountry",
    key: "currentCountry",
  },
];

const AllLeadsPage = () => {
  const { message } = App.useApp();
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  const [shareOpen, setShareOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 1) || 1;
  const pageSize = Number(searchParams.get("pageSize") ?? 10) || 10;
  const destination = searchParams.get("destination") ?? "";
  const studyLevel = searchParams.get("studyLevel") ?? "";
  const country = searchParams.get("country") ?? "";

  const setFilter = (key: string, value?: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next, { replace: true });
  };

  const destinationOptions = Array.from(
    new Set(leads.map((lead) => lead.destinationCountry)),
  ).map((value) => ({ value, label: value }));

  const studyLevelOptions = Array.from(
    new Set(leads.map((lead) => lead.studyLevel)),
  ).map((value) => ({ value, label: value }));

  const countryOptions = Array.from(
    new Set(leads.map((lead) => lead.currentCountry)),
  ).map((value) => ({ value, label: value }));

  const query = search.trim().toLowerCase();
  const dataSource = leads.filter((lead) => {
    const matchesSearch =
      !query ||
      lead.studentName.toLowerCase().includes(query) ||
      lead.id.toLowerCase().includes(query) ||
      lead.email.toLowerCase().includes(query) ||
      lead.mobile.toLowerCase().includes(query);

    const matchesDestination =
      !destination || lead.destinationCountry === destination;
    const matchesLevel = !studyLevel || lead.studyLevel === studyLevel;
    const matchesCountry = !country || lead.currentCountry === country;

    return matchesSearch && matchesDestination && matchesLevel && matchesCountry;
  });

  const handleTableChange: TableProps<Lead>["onChange"] = (pagination) => {
    const next = new URLSearchParams(searchParams);
    next.set("page", String(pagination.current ?? 1));
    next.set("pageSize", String(pagination.pageSize ?? 10));
    setSearchParams(next, { replace: true });
  };

  const exportCsv = () => {
    const headers = [
      "ID",
      "Student Name",
      "Destination Country",
      "Email",
      "Mobile Number",
      "Study Level",
      "Current Country",
    ];
    const rows = dataSource.map((lead) => [
      lead.id,
      lead.studentName,
      lead.destinationCountry,
      lead.email,
      lead.mobile,
      lead.studyLevel,
      lead.currentCountry,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Breadcrumb />

      <DataTable<Lead>
        title="All Leads"
        extra={
          <Space>
            {selectedRowKeys.length > 0 ? (
              <Button
                className="leads-page__share"
                icon={<FiShare2 />}
                onClick={() => setShareOpen(true)}
              >
                Share
              </Button>
            ) : null}
            <Button type="primary" icon={<FiPlus />}>
              New Lead
            </Button>
          </Space>
        }
        filters={
          <>
            <SelectField
              placeholder="All destinations"
              width={170}
              value={destination || undefined}
              onChange={(value) =>
                setFilter("destination", value as string | undefined)
              }
              options={destinationOptions}
            />
            <SelectField
              placeholder="All study levels"
              width={170}
              value={studyLevel || undefined}
              onChange={(value) =>
                setFilter("studyLevel", value as string | undefined)
              }
              options={studyLevelOptions}
            />
            <SelectField
              placeholder="All countries"
              width={170}
              value={country || undefined}
              onChange={(value) =>
                setFilter("country", value as string | undefined)
              }
              options={countryOptions}
            />
            <Button icon={<FiDownload />} onClick={exportCsv}>
              Export CSV
            </Button>
          </>
        }
        searchable
        searchPlaceholder="Name, ID, email or mobile..."
        searchValue={search}
        onSearchChange={setSearch}
        selectable
        selectedRowKeys={selectedRowKeys}
        onSelectionChange={setSelectedRowKeys}
        columns={columns}
        dataSource={dataSource}
        onChange={handleTableChange}
        pagination={{
          current: page,
          pageSize,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
        }}
      />

      <ShareLeadsModal
        open={shareOpen}
        leadCount={selectedRowKeys.length}
        onCancel={() => setShareOpen(false)}
        onShare={(agencyIds) => {
          const count = selectedRowKeys.length;
          message.success(
            `Shared ${count} ${count === 1 ? "lead" : "leads"} with ${agencyIds.length} ${
              agencyIds.length === 1 ? "agency" : "agencies"
            }.`,
          );
          setShareOpen(false);
          setSelectedRowKeys([]);
        }}
      />
    </>
  );
};

export default AllLeadsPage;
