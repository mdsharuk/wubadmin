import { Avatar, Button, Result } from "antd";
import { FiUser } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "@/components/common/Breadcrumb";
import StatusPill, {
  StatusPillVariant,
} from "@/components/common/StatusPill";
import { useAppSelector } from "@/hooks";

const statusVariant: Record<string, StatusPillVariant> = {
  Active: "success",
  Enrolled: "info",
  Inactive: "default",
  Graduated: "warning",
  Trashed: "danger",
};

type Field = [string, string];
type Section = { title: string; fields?: Field[]; text?: string };

const empty = "—";

const StudentViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const student = useAppSelector((state) =>
    state.students.items.find((item) => item.id === id),
  );

  if (!student) {
    return (
      <>
        <Breadcrumb />
        <Result
          status="404"
          title="Student not found"
          extra={
            <Button type="primary" onClick={() => navigate("/students")}>
              Back to students
            </Button>
          }
        />
      </>
    );
  }

  const [firstName, ...rest] = student.name.split(" ");
  const lastName = rest.join(" ");

  const sections: Section[] = [
    {
      title: "Personal Details",
      fields: [
        ["First Name", firstName],
        ["Middle Name", empty],
        ["Last Name", lastName],
        ["Date of Birth", empty],
        ["Gender", empty],
        ["Country calling code", empty],
        ["Contact number", student.contact],
        ["Email", student.email],
        ["Country", empty],
        ["State", empty],
        ["City", empty],
        ["Address", empty],
        ["Postal/Zip Code", empty],
        ["Nationality / citizenship", empty],
        ["Primary language", empty],
        ["Secondary language", empty],
        ["LinkedIn profile URL", empty],
        ["US Armed Forces veteran", empty],
        ["Timezone", empty],
        ["Marital Status", empty],
      ],
    },
    {
      title: "Study Preferences",
      fields: [
        ["Study destinations", student.destinations],
        ["Intended study levels", student.studyLevels],
        ["Subjects of interest", empty],
        ["Study mode", empty],
        ["Preferred intake", empty],
        ["Preferred intake year", empty],
        ["Preferred start date", empty],
        ["Study funding", empty],
        ["Tuition budget (USD)", empty],
        ["MBA specialisation", empty],
        ["MBA programme types", empty],
        ["Interested University", empty],
        ["Status", student.status],
      ],
    },
    {
      title: "Academic Overview",
      fields: [
        ["Highest qualification", empty],
        ["Subjects studied", empty],
        ["Grading system", empty],
        ["Qualification score", empty],
        ["Graduation year", empty],
        ["Average grade (%)", empty],
        ["English test results available?", empty],
      ],
    },
    { title: "Education Summary", text: "No education summary added yet." },
    { title: "Test Scores", text: "No test scores added yet." },
    {
      title: "Work Overview",
      fields: [
        ["Total work experience", empty],
        ["Postgraduate work experience", empty],
        ["Current industry", empty],
        ["Current employer", empty],
      ],
    },
    { title: "Experience", text: "No experience added yet." },
    {
      title: "Additional Information",
      fields: [
        ["Emergency Contact — Name", empty],
        ["Emergency Contact — Contact", empty],
        ["Emergency Contact — Email", empty],
        ["Emergency Contact — Relation with Contact", empty],
        ["Mailing Address — Address", empty],
        ["Mailing Address — Country", empty],
        ["Mailing Address — State", empty],
        ["Mailing Address — City", empty],
        ["Mailing Address — Postal/Zip Code", empty],
        ["Permanent Address — Address", empty],
        ["Permanent Address — Country", empty],
        ["Permanent Address — State", empty],
        ["Permanent Address — City", empty],
        ["Permanent Address — Postal/Zip Code", empty],
        ["Background Information — Any Refused Visa", empty],
        ["Background Information — Any Study Permit", empty],
        ["Background Information — Description", empty],
        ["Data Sharing Consent — Written data sharing consent from", empty],
        ["Data Sharing Consent — Consent recorded on", empty],
        ["Data Sharing Consent — Where consent is recorded", empty],
      ],
    },
  ];

  return (
    <>
      <Breadcrumb lastLabel={student.name} />

      <div className="student-view__head">
        <Avatar size={56} icon={<FiUser />} />
        <div>
          <h1 className="student-view__name">{student.name}</h1>
          <p className="student-view__meta">
            {student.email} · {student.contact}
          </p>
        </div>
        <StatusPill
          label={student.status}
          variant={statusVariant[student.status] ?? "default"}
        />
      </div>

      <div className="student-view__sections">
        {sections.map((section) => (
          <div key={section.title} className="student-view__section">
            <h2 className="student-view__section-title">{section.title}</h2>
            {section.text ? (
              <p className="student-view__empty">{section.text}</p>
            ) : (
              <div className="student-view__grid">
                {section.fields?.map(([label, value]) => (
                  <div key={label} className="student-view__field">
                    <span className="student-view__label">{label}</span>
                    <span className="student-view__value">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentViewPage;
